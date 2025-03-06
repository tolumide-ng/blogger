<script setup lang="ts">
import { reactive } from 'vue';
import BlogEntry from '../BlogEntry/BlogEntry.vue';
import { PostItem, Status, Page } from '@/utils/types';
import { apiCall } from '@/utils/apiCall';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

type State = {
  status: Status;
  data: PostItem;
};

const state = reactive<State>({
  status: Status.Rest,
  data: {
    title: '',
    description: '',
    id: crypto.randomUUID(),
    author: '',
    post: '',
  },
});

async function onSubmit() {
  try {
    state.status = Status.Loading;
    await apiCall({
      method: 'POST',
      path: `posts`,
      data: state.data,
    });

    state.status = Status.Success;
    toast.success('Success: Post Created successfully', {
      autoClose: 1000,
    });
  } catch (error) {
    state.status = Status.Error;
    toast.error('Error Creating post, please try again later', {
      autoClose: 1000,
    });
  }
}
</script>
<template>
  <BlogEntry
    v-model="state.data"
    :pageName="Page.CreateBlogPost"
    :status="state.status"
    :onSubmit="onSubmit"
    v-if="state.data"
  />
</template>
