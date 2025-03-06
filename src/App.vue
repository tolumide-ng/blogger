<script setup lang="ts">
import { RouterView } from 'vue-router';
import TopBar from './components/TopBar/TopBar.vue';
</script>

<template>
  <div class="app__root">
    <TopBar />
    <article class="app__content">
      <RouterView />
    </article>
  </div>
</template>
