import * as api from '@/utils/apiCall';
import { flushPromises, mount } from '@vue/test-utils';
import AllPosts from './AllPosts.vue';
import BlogTable from '../BlogTable/BlogTable.vue';

vi.mock('vue3-toastify', { spy: true });

vi.mock('@/utils/apiCall', () => ({
  apiCall: vi.fn(),
}));

const mockPosts = [
  {
    id: '1',
    title: 'Post 1',
    description: 'Description 1',
    author: 'Author 1',
  },
  {
    id: '2',
    title: 'Post 2',
    description: 'Description 2',
    author: 'Author 2',
  },
];

describe('AllPosts', () => {
  it('should render posts and handle search input', async () => {
    vi.mocked(api.apiCall).mockResolvedValueOnce(mockPosts);

    const wrapper = mount(AllPosts);
    await flushPromises();

    expect(api.apiCall).toHaveBeenCalledWith({
      path: 'posts',
      method: 'GET',
      params: {},
    });

    const blogTable = wrapper.findComponent(BlogTable);

    expect(wrapper.text()).toContain('Search for Post: 🔍');
    expect(wrapper.text()).toContain('Create new Post');
    expect(wrapper.text()).toContain('Post 1');
    expect(wrapper.text()).toContain('Post 2');
    expect(wrapper.text()).toContain('Description 1');
    expect(wrapper.text()).toContain('Description 2');
    expect(blogTable.text()).toBeTruthy();
  });
});
