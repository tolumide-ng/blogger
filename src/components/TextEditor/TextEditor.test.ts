import { mount } from '@vue/test-utils';
import TextEditor from './TextEditor.vue';
import { Status } from '@/utils/types';
import * as Quill from 'quill';

vi.mock('quill', { spy: true });

const mockQuil = {
  default: vi.fn().mockImplementation(() => ({
    root: HTMLElement,
    constructor(element: HTMLElement) {
      this.root = element;
      this.root.innerHTML = '';
    },
  })),
  root: {
    innerHTML: '',
  },
  on(event: string, handler: Function) {
    if (event === 'text-change') {
      handler();
    }
  },
};

describe('TextEditor', () => {
  it('should initialize Quill editor on mounted', async () => {
    vi.spyOn(Quill, 'default').mockReturnValue(mockQuil as any);

    mount(TextEditor, {
      props: {
        modelValue: 'Initial content',
        status: Status.Rest,
      },
    });

    expect(Quill.default).toHaveBeenCalledTimes(1);
    const quillInstance = new Quill.default(document.createElement('div'), {});
    expect(quillInstance.root.innerHTML).toBe('Initial content');
  });

  it('should update modelValue when text changes in the editor', async () => {
    const emit = vi.fn();
    const wrapper = mount(TextEditor, {
      props: {
        modelValue: 'Initial content',
        status: Status.Rest,
      },
      global: {
        stubs: {
          'router-link': true,
        },
      },
      emit,
    });

    const quillInstance = new Quill.default(document.createElement('div'), {});

    const textChangeHandler = vi.fn();
    quillInstance.on('text-change', textChangeHandler);
    textChangeHandler();

    expect(wrapper.emitted('update:modelValue')).toEqual([['Initial content']]);
  });
});
