import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';
import {
    GetRequest,
    PostRequest,
    NumberKeyValidation
} from '../../utils/globalservice';
import * as config from '../../config/constants.js'
import Sidebar from '../Sidebar';

Vue.use(VueLocalStorage, {
  name: 'lsobj',
  createComputed: true //created computed members from your variable declarations
})

export default {
  name: 'dashboard',
  components: {Sidebar},
  props: [],
  data() {
    this.BaseUrl = config.BASE_URL;
    this.isUserSuperAdmin = false;
    this.isUserAdmin = false;
    this.isUserTeacher = false;
    this.isUserStudent = false;
    this.asAdminToggle = false;
    return {
      classes: {
        fixed_layout: false,
        hide_logo: false
      },
      get loginUserName() {
        return  localStorage.getItem('loginName');
      },
      loginRole: Vue.lsobj.get('rolename'),
      SecondryRolename: Vue.lsobj.get('SecondryRolename')
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    getShowHideOptions: function () {
      let loginRole = Vue.lsobj.get('loginRole');
      switch (loginRole) {
        case '1':
          this.isUserSuperAdmin = true;
          break;
        case '2':
          this.isUserAdmin = true;
          break;
        case '3':
          this.isUserTeacher = true;
          break;
        case '4':
          this.isUserStudent = true;
          break;
        default:
          null;
      }
    },

    roleToggle(event) {
      console.log('role changed', this.asAdminToggle, event.target.checked);

      let postData = {};
      GetRequest(this.BaseUrl + 'api/superAdmin/switch/user', postData).then(res => {
          if (res) {
            Vue.lsobj.set('loginToken', res.result.message[0].token);

            if(res.result.message[0].user_roles.length == 1) {
              Vue.lsobj.set('rolename', res.result.message[0].user_roles[0].role.rolename);
              Vue.lsobj.set('loginRole', res.result.message[0].user_roles[0].role.id);
            } else {
              Vue.lsobj.set('rolename', res.result.message[0].user_roles[0].role.rolename);
              Vue.lsobj.set('loginRole', 2);
              Vue.lsobj.set('SecondryRolename', res.result.message[0].user_roles[1].role.rolename);
            }

            this.$router.push('/Dashboard');
            location.reload();
          }
      });
    },

    logout() {
      localStorage.clear();
    },

    mainTabsClick(sender) {
      let allTabs = document.getElementsByClassName('clsMainTab');
      for (let i = 0; i < allTabs.length; i++) {
        allTabs[i].id = allTabs[i].innerText;
      }
      document.getElementById(sender.currentTarget.outerText).setAttribute("id", "current");
    }
  },
  created: function(){
    this.getShowHideOptions();
  }
}
