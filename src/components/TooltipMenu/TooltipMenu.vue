<script setup lang="ts">
const props = defineProps<{
  options: Array<string>;
  onClick: (_: (typeof props)['options'][number]) => void;
}>();
</script>

<template>
  <div class="tooltip">
    <ul class="tooltip-ul">
      <li
        class="tooltip-li"
        v-for="option in props.options"
        :key="option"
        @click="props.onClick(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.tooltip {
  width: 4rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background: white;
  border: 1px solid var(--color-gray);
  border-radius: var(--border-sm);
  z-index: 1000;
}

.tooltip-ul {
  list-style-type: none;
}

.tooltip-li {
  border-bottom: 1px solid var(--color-gray);
  padding: var(--padding-sm);
  cursor: pointer;
  font-weight: normal;
}

.tooltip-li:hover {
  background-color: var(--color-layer);
}

.tooltip-li:nth-child(2) {
  border-bottom: none;
}
</style>
