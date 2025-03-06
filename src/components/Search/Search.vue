<script setup lang="ts">
import { Page } from '@/utils/types';
import { useRouter } from 'vue-router';

const props = defineProps<{ modelValue: string }>();
const router = useRouter();
const emit = defineEmits();

function createNewPost() {
  router.push({ name: Page.CreateBlogPost });
}

function updateFilter(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>

<template>
  <div class="search">
    <div class="search__container">
      <label for="search" class="search__label">Search for Post: </label>
      <div class="search__input-wrapper">
        <div class="search__icon">🔍</div>
        <input
          :value="props.modelValue"
          @input="updateFilter"
          class="search__input"
          type="text"
          name="search"
          placeholder="Search for Post..."
        />
      </div>
    </div>

    <button @click="createNewPost" class="search__newpost">
      Create new Post
    </button>
  </div>
</template>

<style scoped>
.search {
  width: 100%;
  display: flex;
  align-items: end;
}

.search__container {
  width: 100%;
  gap: 0.5rem;
}

.search__label {
  font-size: 1rem;
}

.search__input-wrapper {
  display: flex;
  gap: 1rem;
  border: 1px solid var(--color-default);
  border-radius: var(--border-sm);
  padding: var(--padding-sm);
  padding-left: 1rem;
  margin-right: 1rem;
  margin-top: 0.5rem;
}

.search__input {
  border: none;
  width: 100%;
  outline: none;
}

.search__newpost {
  width: 10rem;
  background-color: transparent;
  border: 1px solid var(--color-default);
  border-radius: var(--border-sm);
  height: 2.25rem;
  cursor: pointer;
}

.search__newpost:active {
  transform: scale(0.98);
}
</style>
