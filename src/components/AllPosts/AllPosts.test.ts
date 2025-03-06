import * as api from '@/utils/apiCall';
import { mount } from '@vue/test-utils';
import AllPosts from './AllPosts.vue';
import BlogTable from '../BlogTable/BlogTable.vue';

vi.mock('@/utils/apiCall', { spy: true });
vi.mock('vue3-toastify', { spy: true });

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

    expect(api.apiCall).toHaveBeenCalledWith({
      path: 'posts',
      method: 'GET',
      params: {},
    });

    await wrapper.vm.$nextTick();
    const blogTable = wrapper.findComponent(BlogTable);

    expect(wrapper.text()).toContain(
      'Search for Post: 🔍 Create new Post title description author',
    );

    expect(blogTable.text()).toBeTruthy();
  });
});
