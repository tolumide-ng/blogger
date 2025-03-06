<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import BlogEntry from '../BlogEntry/BlogEntry.vue';
import { useRoute } from 'vue-router';
import { NoticeType, PostItem, Status, Page } from '@/utils/types';
import { apiCall } from '@/utils/apiCall';
import Notification from '../Notification/Notification.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

type State = {
  status: Status;
  data: PostItem | null;
};

const router = useRoute();
const { id } = router.params;

const state = reactive<State>({ status: Status.Rest, data: null });

async function fetchBlogEntry() {
  try {
    state.status = Status.Loading;
    state.data = await apiCall<PostItem>({
      method: 'GET',
      path: `posts/${id}`,
    });
    state.status = Status.Success;
  } catch (error) {
    state.status = Status.Error;
  }
}

async function onSubmit() {
  try {
    state.status = Status.Loading;
    await apiCall({
      method: 'PUT',
      path: `posts/${id}`,
      data: state.data,
    });
    state.status = Status.Success;
    toast.success('Success: Post Updated successfully', {
      autoClose: 1000,
    });
  } catch (error) {
    state.status = Status.Error;
    toast.error('Error Updating this post, please try again later', {
      autoClose: 1000,
    });
  }
}

onMounted(() => {
  (async () => {
    await fetchBlogEntry();
  })();
});
</script>
<template>
  <BlogEntry
    v-model="state.data"
    :status="state.status"
    :onSubmit="onSubmit"
    :pageName="Page.EditBlogPost"
    v-if="state.data"
  />

  <Notification
    :type="NoticeType.Error"
    title="Error Loading BlogPost"
    message="Could not find the blogPost you're trying to load, please try again later"
    v-if="state.status === Status.Error && !state.data"
  />
</template>
