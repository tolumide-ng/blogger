<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import Search from '../Search/Search.vue';
import BlogTable from '../BlogTable/BlogTable.vue';
import { useRouter } from 'vue-router';
import { NoticeType, Page, PostItem, Status } from '@/utils/types';
import { apiCall } from '@/utils/apiCall';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useDebounce } from '@/utils/useDebounce';
import { getFilterParams } from '@/utils/filterParams';
import Notification from '../Notification/Notification.vue';

type PostData = { data: PostItem[]; pendingDeletes: Set<string> };

const tooltipActions = ['Edit', 'Delete'];
const filterKey = ref('');
const router = useRouter();

const posts = reactive<PostData>({ data: [], pendingDeletes: new Set() });
const status = ref<Status>(Status.Rest);
const debouncedFilter = useDebounce(filterKey, 300);

async function onEditOrDelete(
  action: (typeof tooltipActions)[number],
  ids: Array<string>,
) {
  if (action === 'Edit') {
    router.push({ name: Page.EditBlogPost, params: { id: ids[0] } });
  } else {
    await deleteBlogPost(ids);
  }
}

async function deleteBlogPost(ids: Array<string>) {
  posts.pendingDeletes = new Set([...Array.from(posts.pendingDeletes), ...ids]);

  try {
    const path = ids.length === 1 ? `posts/${ids[0]}` : `posts`;
    const params = ids.length > 1 ? { ids } : {};
    await apiCall({ path, method: 'DELETE', params });
    posts.data = posts.data.filter((post: PostItem) => !ids.includes(post.id));
  } catch (error) {
    toast.error('Error Deleting post, please try again later', {
      autoClose: 1000,
    });
  } finally {
    ids.forEach((id) => posts.pendingDeletes.delete(id));
  }
}

async function loadAllPosts(filter?: string) {
  try {
    status.value = Status.Loading;
    posts.data = [];
    posts.pendingDeletes = new Set();

    const params = filter ? getFilterParams(filter) : {};

    posts.data = await apiCall<Array<PostItem>>({
      path: 'posts',
      method: 'GET',
      params,
    });

    status.value = Status.Success;
  } catch (error) {
    status.value = Status.Error;
  }
}

onMounted(() => {
  loadAllPosts();
});

watch(debouncedFilter, (newValue) => {
  loadAllPosts(newValue);
});
</script>

<template>
  <article class="posts">
    <section class="posts__header">
      <Search
        :model-value="filterKey"
        @update:modelValue="filterKey = $event"
      />
    </section>
    <BlogTable
      :posts="posts.data"
      :tooltipAction="tooltipActions"
      :onEditOrDelete="onEditOrDelete"
      :pendingDeletes="Array.from(posts.pendingDeletes)"
      v-if="status === Status.Success && posts.data.length"
    />
    <p class="posts__nomatch" v-if="filterKey && !posts.data?.length">
      Could not find any matches for **{{ filterKey }}**
    </p>

    <Notification
      :type="NoticeType.Error"
      title="Error Loading BlogPosts"
      message="Could not load blog posts, please try again later"
      v-if="!filterKey && status === Status.Error && !posts.data?.length"
    />
  </article>
</template>
<style lang="css" scoped>
.posts__nomatch {
  margin-top: 2rem;
  text-align: center;
}
</style>
