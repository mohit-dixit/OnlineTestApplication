// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueResource);

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.AuthRequired)) {
//      console.log('entered');
//   } else {
//     console.log('entered');
//     next();
//   }
// })

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App,
    BootstrapVue
  },
  data() {
    return {

    }
  }
})
