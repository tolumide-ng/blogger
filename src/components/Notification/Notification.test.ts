import { mount } from '@vue/test-utils';
import Notification from './Notification.vue';
import { NoticeType } from '@/utils/types';

describe('Notification', () => {
  it('should render the title and message correctly', () => {
    const wrapper = mount(Notification, {
      props: {
        title: 'Error title',
        message: 'This is an error message',
        type: NoticeType.Error,
      },
    });

    expect(wrapper.text()).toContain('Error title');
    expect(wrapper.text()).toContain('This is an error message');

    const container = wrapper.find('.notice__container');
    expect(container.classes()).toContain('notice-error');
    expect(container.classes()).not.toContain('notice-warning');

    const button = wrapper.find('.notice__button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Go Back Home');
  });

  it('should apply "notice-warning" class when type is NoticeType.Warning', () => {
    const wrapper = mount(Notification, {
      props: {
        title: 'Warning Title',
        message: 'This is a warning message.',
        type: NoticeType.Warning,
      },
    });

    const container = wrapper.find('.notice__container');
    expect(container.classes()).toContain('notice-warning');
    expect(container.classes()).not.toContain('notice-error');
  });
});
