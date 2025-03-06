import { mount } from '@vue/test-utils';
import BlogTable from './BlogTable.vue';
import { InputHTMLAttributes } from 'vue';

describe('BlogTable', () => {
  const posts = [
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

  const pendingDeletes = ['2'];
  const tooltipAction = ['Edit', 'Delete'];

  it('renders posts correctly', () => {
    const wrapper = mount(BlogTable, {
      props: {
        posts,
        pendingDeletes,
        tooltipAction,
        onEditOrDelete: vi.fn(),
      },
    });

    const rows = wrapper.findAll('tr');
    expect(rows).toHaveLength(posts.length + 1); // + header row

    const firstRow = rows[1];
    expect(firstRow.text()).toContain(posts[0].title);
    expect(firstRow.text()).toContain(posts[0].description);
    expect(firstRow.text()).toContain(posts[0].author);
  });

  it('shows tooltip when clicking on the action button', async () => {
    const wrapper = mount(BlogTable, {
      props: {
        posts,
        pendingDeletes,
        tooltipAction,
        onEditOrDelete: vi.fn(),
      },
    });

    const button = wrapper.findAll('button.table__cell-button')[0];
    await button.trigger('click');

    const tooltip = wrapper.find('.table__cell-tooltip');
    expect(tooltip.exists()).toBe(true);
  });

  it('does not show tooltip for pending deletes', async () => {
    const wrapper = mount(BlogTable, {
      props: {
        posts,
        pendingDeletes,
        tooltipAction,
        onEditOrDelete: vi.fn(),
      },
    });

    const button = wrapper.findAll('button.table__cell-button')[1];
    await button.trigger('click');

    const tooltip = wrapper.find('.table__cell-tooltip');
    expect(tooltip.exists()).toBe(false);
  });

  it('selects all posts when the "Select All" checkbox is clicked', async () => {
    const wrapper = mount(BlogTable, {
      props: {
        posts,
        pendingDeletes,
        tooltipAction,
        onEditOrDelete: vi.fn(),
      },
    });

    const selectAllCheckbox = wrapper.find('input[type="checkbox"]');
    await selectAllCheckbox.setValue(true);

    const selectedCheckboxes = wrapper.findAll(
      'input[type="checkbox"]:checked',
    );
    expect(selectedCheckboxes).toHaveLength(posts.length + 1);
  });

  it('deselects all posts when the "Select All" checkbox is unchecked', async () => {
    const wrapper = mount(BlogTable, {
      props: {
        posts,
        pendingDeletes,
        tooltipAction,
        onEditOrDelete: vi.fn(),
      },
    });

    const selectAllCheckbox = wrapper.find('input[type="checkbox"]');
    await selectAllCheckbox.setValue(true);

    await selectAllCheckbox.setValue(false);

    const selectedCheckboxes = wrapper.findAll(
      'input[type="checkbox"]:checked',
    );
    expect(selectedCheckboxes).toHaveLength(0);
  });

  it('toggles selection when an individual checkbox is clicked', async () => {
    const wrapper = mount(BlogTable, {
      props: {
        posts,
        pendingDeletes,
        tooltipAction,
        onEditOrDelete: vi.fn(),
      },
    });

    const firstCheckbox = wrapper.findAll('input[type="checkbox"]')[1];
    await firstCheckbox.setValue(true);

    expect((firstCheckbox.element as InputHTMLAttributes).checked).toBe(true);

    await firstCheckbox.setValue(false);
    expect((firstCheckbox.element as InputHTMLAttributes).checked).toBe(false);
  });
});
