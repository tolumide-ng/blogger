<script setup lang="ts">
import { Status } from '@/utils/types';
import Quill from 'quill';
import { onMounted, ref, watch } from 'vue';

const editor = ref<HTMLDivElement | null>(null);
const quilInstance = ref<Quill | null>(null);

const props = defineProps<{ modelValue: string; status: Status }>();
const emit = defineEmits(['update:modelValue']);

onMounted(() => {
  if (editor.value) {
    quilInstance.value = new Quill(editor.value, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['link'],
          ['clean'],
        ],
      },
    });

    quilInstance.value.root.innerHTML = props.modelValue;

    quilInstance.value.on('text-change', () => {
      const updatedContent = quilInstance.value?.root.innerHTML ?? '';
      emit('update:modelValue', updatedContent);
    });
  }
});

watch(
  () => props.status,
  (status: Status) => {
    if (!quilInstance.value) return;

    if (status === Status.Loading) {
      quilInstance.value.root.setAttribute('contenteditable', 'false');
    } else {
      quilInstance.value.root.setAttribute('contenteditable', 'true');
    }
  },
);
</script>
<template>
  <article class="texteditor">
    <div class="texteditor-editor" ref="editor"></div>
  </article>
</template>
<style scoped>
.ql-container {
  min-height: 10rem;
}
::v-deep .ql-editor {
  min-height: 10rem;
}
</style>
