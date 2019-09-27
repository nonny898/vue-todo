import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router';
import router from './route';
import firebase from 'firebase'

import './assets/todo.css'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(Router);

Vue.config.productionTip = false;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDsg5WN31vrdYWLrdw1DvIKB-GEh_V2xkg",
  authDomain: "vue-todo-non.firebaseapp.com",
  databaseURL: "https://vue-todo-non.firebaseio.com",
  projectId: "vue-todo-non",
  storageBucket: "",
  messagingSenderId: "584597820396",
  appId: "1:584597820396:web:5c65a687e2d028ef52a6c9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app = null;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      render: h => h(App),
      router,
    }).$mount('#app');
  }
});