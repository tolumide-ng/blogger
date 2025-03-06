import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { h } from 'vue';
import TopBar from './TopBar.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: { render: () => h('div') } }],
});

it('renders the top bar with the correct title', async () => {
  const wrapper = mount(TopBar, {
    global: {
      plugins: [router],
    },
  });

  await router.isReady();
  expect(wrapper.text()).toContain('Blogger');

  const routerLink = wrapper.findComponent({ name: 'RouterLink' });
  expect(routerLink.exists()).toBe(true);
  expect(routerLink.props().to).toBe('/');
});
