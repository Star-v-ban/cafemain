import App from './App.vue';
import { createPinia } from 'pinia';
import { createApp  } from 'vue'
import { createVuetify } from 'vuetify';
import { router } from './routers/router.js'
import './style.scss';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
.use(createPinia())
.use(router)
.use(vuetify)
.mount('#app');

