import { useRoute } from 'vue-router';
import { Mock } from 'vitest';
import * as api from '@/utils/apiCall';
import CreateBlog from './CreateBlog.vue';
import { flushPromises, mount } from '@vue/test-utils';
import BlogEntry from '../BlogEntry/BlogEntry.vue';
import * as toaster from 'vue3-toastify';
import { Page } from '@/utils/types';

vi.mock('vue3-toastify', { spy: true });
vi.mock('vue3-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock('@/utils/apiCall', () => ({
  apiCall: vi.fn(),
}));

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}));

const mockPost = {
  title: '',
  post: '',
  author: '',
  description: '',
  id: '',
};

describe('CreateBlog', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useRoute as Mock).mockReturnValue({
      params: { name: Page.CreateBlogPost },
    });
  });

  it('renders the component correctly', async () => {
    vi.mocked(api.apiCall).mockResolvedValueOnce(mockPost);

    const wrapper = mount(CreateBlog);

    expect(api.apiCall).not.toHaveBeenCalled();
    await wrapper.findComponent(BlogEntry).props().onSubmit();

    expect(wrapper.text()).toContain('Create blog entry');
    expect(wrapper.text()).toContain('Author');
    expect(wrapper.text()).toContain('Description');
    expect(wrapper.text()).toContain('Title');
    expect(wrapper.text()).toContain('Body');
  });

  it('Displays an success toaster if submission succeeds', async () => {
    vi.mocked(api.apiCall).mockResolvedValue(mockPost);
    const mockSuccess = vi.fn();

    vi.spyOn(toaster.toast, 'success').mockImplementation(mockSuccess);
    vi.spyOn(toaster.toast, 'error').mockImplementation(vi.fn());

    const wrapper = mount(CreateBlog);
    await flushPromises();

    await wrapper.findComponent(BlogEntry).props().onSubmit();
    await flushPromises();

    expect(api.apiCall).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        path: 'posts',
      }),
    );

    expect(mockSuccess).toHaveBeenCalledWith(
      'Success: Post Created successfully',
      {
        autoClose: 1000,
      },
    );
  });
});
