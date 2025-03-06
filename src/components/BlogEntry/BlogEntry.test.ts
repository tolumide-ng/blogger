import { mount } from '@vue/test-utils';
import BlogEntry from './BlogEntry.vue';
import * as route from 'vue-router';
import { Mock } from 'vitest';
import { Page, Status } from '@/utils/types';

vi.mock('useRoute', { spy: true });
vi.mock('useRouter', { spy: true });

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}));

describe('BlogEntry', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const modelValue = {
    title: 'Test Title',
    post: 'Test Post',
    author: 'Test Author',
    description: 'Test Description',
  };

  it('renders component correctly', async () => {
    const mockOnSubmit = vi.fn();

    const wrapper = mount(BlogEntry, {
      props: {
        onSubmit: mockOnSubmit,
        status: Status.Rest,
        pageName: Page.CreateBlogPost,
        modelValue,
      },
      global: {
        stubs: {
          TextEditor: true,
        },
      },
    });

    expect(wrapper.find('.blog__header-title').text()).toBe(
      'Create blog entry',
    );

    expect(mockOnSubmit).not.toHaveBeenCalled();
    await wrapper.find('form').trigger('submit.prevent');
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('Renders the Blog Entry in Edit Mode', async () => {
    const mockOnSubmit = vi.fn();

    const wrapper = mount(BlogEntry, {
      props: {
        onSubmit: mockOnSubmit,
        status: Status.Rest,
        modelValue,
        pageName: Page.EditBlogPost,
      },
      global: {
        stubs: {
          TextEditor: true,
        },
      },
    });

    expect(wrapper.find('.blog__header-title').text()).toBe('Edit blog entry');

    expect(mockOnSubmit).not.toHaveBeenCalled();
    await wrapper.find('form').trigger('submit.prevent');
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('disables submit button when status is loading', () => {
    const wrapper = mount(BlogEntry, {
      props: {
        onSubmit: vi.fn(),
        status: Status.Loading,
        pageName: Page.EditBlogPost,
        modelValue,
      },
      global: {
        stubs: {
          TextEditor: true,
        },
      },
    });
    expect(
      wrapper.find('button[type="submit"]').attributes('disabled'),
    ).toBeDefined();
  });

  it('navigates to home when cancel button is clicked', async () => {
    const mockRouterPush = vi.fn();

    (route.useRouter as unknown as Mock).mockReturnValue({
      push: mockRouterPush,
    });

    const wrapper = mount(BlogEntry, {
      props: {
        onSubmit: vi.fn(),
        status: Status.Loading,
        pageName: Page.EditBlogPost,
        modelValue,
      },
      global: {
        stubs: {
          TextEditor: true,
        },
      },
    });

    await wrapper.find('button').trigger('click');
    expect(mockRouterPush).toHaveBeenCalledWith({ name: Page.Home });
  });
});
