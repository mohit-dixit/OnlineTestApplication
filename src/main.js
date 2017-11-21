// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'
import VueEditor from 'vue2-editor'
import DatePicker from 'vue-bootstrap-datetimepicker'
import BreabCrumbs from 'vue-2-breadcrumbs'
import VueGoodTable from 'vue-good-table'

import '../node_modules/vue-bootstrap-datetimepicker/node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VueEditor, {});
Vue.use(BreabCrumbs);
Vue.use(VueGoodTable);

//Interceptor to send Token in Headers. ================================================================
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', Vue.lsobj.get('loginToken'))
  next()
})
//Interceptor to send Token in Headers. ================================================================

Vue.component('datePicker',DatePicker);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.AuthRequired)) {
    let loginName = Vue.lsobj.get('loginName');
    if (!loginName) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  data() {
    return {}
  }
})
