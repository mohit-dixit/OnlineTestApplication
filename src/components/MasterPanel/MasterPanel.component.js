import Vue from 'vue'
export default  {
  name: 'master-panel',
  components: {},
  props: [],
  data () {
    this.isUserAdmin = false;
    return {

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    getShowHideOptions: function () {
      let loginRole = Vue.lsobj.get('loginRole');
      switch (loginRole) {
        case '1': this.isUserSuperAdmin = true; break;
        case '2': this.isUserAdmin = true; break;
        case '3': this.isUserTeacher = true; break;
        case '4': this.isUserStudent = true; break;
        default : null;
      }
    }
  },
  created: function() {
    this.getShowHideOptions();
  }
}
