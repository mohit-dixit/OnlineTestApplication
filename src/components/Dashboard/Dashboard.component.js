import Vue from 'vue'

export default {
  name: 'dashboard',
  components: {},
  props: [],
  data() {
    this.isUserSuperAdmin = false;
    this.isUserAdmin = false;
    this.isUserTeacher = false;
    this.isUserStudent = false;
    return {
      loginUserName: Vue.lsobj.get('loginName'),
      loginRole: Vue.lsobj.get('rolename')
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
