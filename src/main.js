// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import "../node_modules/ag-grid/dist/styles/ag-grid.css"
import "../node_modules/ag-grid/dist/styles/theme-fresh.css"
import VueResource from 'vue-resource'
import AgGridVue from "ag-grid-vue"
import VueEditor from 'vue2-editor'
import DatePicker from 'vue-bootstrap-datetimepicker'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
import BreabCrumbs from 'vue-2-breadcrumbs'
import VueGoodTable from 'vue-good-table'
import Vuelidate from 'vuelidate'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VueEditor, {});
Vue.use(BreabCrumbs);
Vue.use(VueGoodTable);
Vue.use(Vuelidate);
Vue.use(VueFormWizard);

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
