import { mount } from '@vue/test-utils';
import TooltipMenu from './TooltipMenu.vue';

describe('TooltipMenu', () => {
  it('renders the correct number of options', () => {
    const options = ['Options 1', 'Option 2'];
    const wrapper = mount(TooltipMenu, {
      props: {
        options,
        onClick: vi.fn(),
      },
    });

    const listItems = wrapper.findAll('.tooltip-li');
    expect(listItems).toHaveLength(options.length);

    options.forEach((option, index) => {
      expect(listItems[index].text()).toBe(option);
    });
  });

  it('emits onClick with an option when clicked', async () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const onClick = vi.fn();
    const wrapper = mount(TooltipMenu, {
      props: {
        options,
        onClick,
      },
    });

    const secondOption = wrapper.findAll('.tooltip-li')[1];
    await secondOption.trigger('click');
    expect(onClick).toHaveBeenCalledWith('Option 2');
  });
});
