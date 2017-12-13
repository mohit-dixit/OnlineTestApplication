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
import vueXlsxTable from 'vue-xlsx-table'
import CubeSpin from 'vue-loading-spinner/src/components/Circle8'

/* For Spinner while HTTP calls  */
// import {RotateSquare2} from 'vue-loading-spinner'

import './assets/style/loader.css';
import './assets/style/bootstrap-datetimepicker.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

// Vue.use(RotateSquare2);
Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VueEditor, {});
Vue.use(BreabCrumbs);
Vue.use(VueGoodTable);
Vue.use(vueXlsxTable, {rABS: false})

//HTTP Interceptor to send Token in Headers. ================================================================
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', Vue.lsobj.get('loginToken'))
  next()
})
//HTTP Interceptor to send Token in Headers. ================================================================

Vue.component('datePicker',DatePicker);
Vue.component('CubeSpin',CubeSpin);

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
