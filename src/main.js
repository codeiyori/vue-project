import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { auth } from './firebase/init.js';
import { initializeApp } from 'firebase/app';

let app;

auth.onAuthStateChanged(() => {
  if(!app) {
    app = createApp(App)
      .use(router)
      .use(store)
      .use(vuetify)
      .mount('#app');
  }
});
