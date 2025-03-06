import { createApp } from 'vue';
import './style.css';
import 'quill/dist/quill.snow.css';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
