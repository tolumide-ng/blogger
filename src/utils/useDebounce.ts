import { onUnmounted, readonly, ref, watch, type Ref } from 'vue';

export function useDebounce(value: Ref<string>, delay: number = 300) {
  const debouncedValue = ref(value.value);
  let timeout: ReturnType<typeof setTimeout> | null = null;

  watch(value, (newValue) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      debouncedValue.value = newValue;
    }, delay);
  });

  onUnmounted(() => {
    if (timeout) clearTimeout(timeout);
  });

  return readonly(debouncedValue);
}
