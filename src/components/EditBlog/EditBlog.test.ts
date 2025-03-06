import { useRoute } from 'vue-router';
import { Mock } from 'vitest';
import * as api from '@/utils/apiCall';
import EditBlog from './EditBlog.vue';
import { flushPromises, mount } from '@vue/test-utils';
import Notification from '../Notification/Notification.vue';
import BlogEntry from '../BlogEntry/BlogEntry.vue';
import * as toaster from 'vue3-toastify';

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
  title: 'Test Title',
  post: 'Test Post',
  author: 'Test Author',
  description: 'Test Description',
};

describe('EditBlog', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useRoute as Mock).mockReturnValue({ params: { id: '123' } });
  });

  it('renders the component correctly', () => {
    vi.mocked(api.apiCall).mockResolvedValueOnce(mockPost);

    const wrapper = mount(EditBlog);

    expect(api.apiCall).toHaveBeenCalledWith({
      method: 'GET',
      path: 'posts/123',
    });

    expect(wrapper.text()).not.toContain('Error Loading BlogPost');
  });

  it('shows an error notification when fetch fails', async () => {
    (api.apiCall as Mock).mockRejectedValueOnce(new Error('API error'));

    vi.spyOn(toaster.toast, 'success').mockImplementation(vi.fn());
    vi.spyOn(toaster.toast, 'error').mockImplementation(vi.fn());

    const wrapper = mount(EditBlog, { props: {} });
    await flushPromises();

    expect(wrapper.text()).toContain('Error Loading BlogPost');
    expect(wrapper.findComponent(Notification).props()).toEqual({
      type: 'error',
      title: 'Error Loading BlogPost',
      message:
        "Could not find the blogPost you're trying to load, please try again later",
    });
  });

  it('Displays an success toaster if submission succeeds', async () => {
    vi.mocked(api.apiCall).mockResolvedValue(mockPost);
    const mockSuccess = vi.fn();

    vi.spyOn(toaster.toast, 'success').mockImplementation(mockSuccess);
    vi.spyOn(toaster.toast, 'error').mockImplementation(vi.fn());

    const wrapper = mount(EditBlog);
    await flushPromises();

    await wrapper.findComponent(BlogEntry).props().onSubmit();
    await flushPromises();

    expect(api.apiCall).toHaveBeenCalledWith({
      method: 'PUT',
      path: 'posts/123',
      data: mockPost,
    });

    expect(mockSuccess).toHaveBeenCalledWith(
      'Success: Post Updated successfully',
      {
        autoClose: 1000,
      },
    );
  });
});
