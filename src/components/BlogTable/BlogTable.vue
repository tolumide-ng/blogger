<script setup lang="ts">
import type { PostItem } from '@/utils/types';
import TooltipMenu from '../TooltipMenu/TooltipMenu.vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

type Props = {
  posts: Array<PostItem>;
  pendingDeletes: Array<string>;
  tooltipAction: Array<string>;
  onEditOrDelete: (
    _action: Props['tooltipAction'][number],
    _id: Array<string>,
  ) => void;
};

const props = defineProps<Props>();
const activePost = ref<string | null>(null);
const selectedOptions = ref<Array<string>>([]);

const tableColumns: Partial<Array<keyof PostItem>> = [
  'title',
  'description',
  'author',
];

const actionsForAll = props.tooltipAction.filter((action) => action !== 'Edit');

function handleClickAction(event: MouseEvent, id: string) {
  event.stopPropagation();
  if (id === 'all') {
    activePost.value = 'all';
    return;
  }

  activePost.value = id;
}

function handleClickOutside(event: MouseEvent) {
  const tooltip = document.querySelector('.table__cell-tooltip');
  const row = document.querySelector('.table__row');

  if (
    !tooltip?.contains(event.target as Node) ||
    !row?.contains(event.target as Node)
  ) {
    activePost.value = null;
  }
}

function toggleSelection(id: string) {
  const index = selectedOptions.value.indexOf(id);
  if (index > -1) {
    selectedOptions.value.splice(index, 1);
  } else {
    selectedOptions.value.push(id);
  }
}
const isAllSelected = computed(
  () => props.posts.length === selectedOptions.value.length,
);

function toggleSelectAll() {
  selectedOptions.value = isAllSelected.value
    ? []
    : props.posts.map((post) => post.id);
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="table__container">
    <table class="table">
      <thead>
        <tr>
          <th class="table__header">
            <input
              name="checkbox"
              type="checkbox"
              @change="toggleSelectAll"
              :checked="isAllSelected"
              v-if="props.posts.length"
            />
          </th>
          <th class="table__header" v-for="column in tableColumns">
            {{ column }}

            <span
              class="table__cell-action"
              v-if="column === 'author' && isAllSelected && props.posts.length"
            >
              <button
                class="table__cell-button"
                type="button"
                @click="(event) => handleClickAction(event, 'all')"
                v-if="isAllSelected"
              >
                :
              </button>

              <div class="table__cell-tooltip" v-if="activePost === 'all'">
                <TooltipMenu
                  :options="actionsForAll"
                  :onClick="(action) => onEditOrDelete(action, selectedOptions)"
                />
              </div>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="row in props.posts"
          :key="row.id"
          :class="[
            'table__row',
            { table__row_disabled: props.pendingDeletes.includes(row.id) },
          ]"
        >
          <td class="table__cell">
            <input
              name="checkbox"
              type="checkbox"
              @change="toggleSelection(row.id)"
              :checked="selectedOptions.includes(row.id)"
            />
          </td>

          <td
            v-for="column in tableColumns"
            class="table__cell table__cell-truncate"
            :key="column"
          >
            <span class="table__cell-data">
              {{ row[column!] }}

              <span
                class="table__cell-action"
                v-if="column === 'author' && !isAllSelected"
              >
                <button
                  class="table__cell-button"
                  type="button"
                  @click="(event) => handleClickAction(event, row.id)"
                  :disabled="props.pendingDeletes.includes(row.id)"
                >
                  🔘
                </button>

                <div class="table__cell-tooltip" v-if="activePost === row.id">
                  <TooltipMenu
                    :options="props.tooltipAction"
                    :onClick="(action) => onEditOrDelete(action, [row.id])"
                  />
                </div>
              </span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table__container {
  width: 100%;
  margin-top: 2rem;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.table__cell:nth-child(1) {
  width: calc(min(2rem, 2%));
}

.table__cell:nth-child(2) {
  width: 30%;
  vertical-align: top;
}
.table__cell:nth-child(3) {
  width: 45%;
}

.table__cell:nth-child(4) {
  width: 25%;
  vertical-align: top;
}

.table__header {
  background-color: var(--color-smokewhite);
  text-transform: capitalize;
}

.table__cell-action {
  position: relative;
}

.table__cell-button {
  margin-left: 1rem;
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  border-radius: var(--border-sm);
  border: 1px solid black;
  background-color: transparent;
}

.table__cell-tooltip {
  position: absolute;
  top: 0.75rem;
  z-index: 10;
  left: 1.5rem;
}

.table th,
.table td {
  border: 1px solid rgb(160 160 160);
  padding: 0.5rem 0.5rem;
  text-align: left;
}

.table__row_disabled {
  opacity: 0.3;
}

.table__cell-data {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

@media screen and (max-width: 64rem) {
  .table__cell-data {
    padding-right: 0;
  }
}
</style>
