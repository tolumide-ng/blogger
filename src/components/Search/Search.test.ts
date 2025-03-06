import { mount } from '@vue/test-utils';
import { createMemoryHistory, createRouter } from 'vue-router';
import Search from './Search.vue';
import { Page } from '@/utils/types';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/create',
      name: Page.CreateBlogPost,
      component: { template: '<div>Create Blog Post</div>' },
    },
  ],
});

describe('Search', () => {
  it('updates input value and emits event onChange', async () => {
    const emit = vi.fn();

    const wrapper = mount(Search, {
      global: {
        plugins: [router],
      },
      props: {
        modelValue: '',
      },
      emit,
    });

    const input = wrapper.find('input');
    await input.setValue('New search term');

    expect(input.element.value).toBe('New search term');
    expect(wrapper.emitted('update:modelValue')).toEqual([['New search term']]);
  });

  it('navigates to the create blog post page when "Create new Post" is clicked', async () => {
    const push = vi.fn();
    router.push = push;

    const wrapper = mount(Search, {
      global: { plugins: [router] },
      props: {
        modelValue: '',
      },
    });

    expect(push).not.toHaveBeenCalled();
    const button = wrapper.find('button.search__newpost');
    await button.trigger('click');
    expect(push).toHaveBeenCalledWith({ name: Page.CreateBlogPost });
  });
});
