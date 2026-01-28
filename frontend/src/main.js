import { createApp } from 'vue';
import router from './routes/router.js';
import './fontStyle.css';
import './style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

createApp(App)
  .use(router)
  .use(Vue3EasyDataTable)
  .use(ElementPlus)
  .use(autoAnimatePlugin)
  .mount('#app');
