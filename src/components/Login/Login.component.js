import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import {
  GetRequest,
  PostRequest,
  LoginAuthentication
} from '../../utils/globalservice'

Vue.use(VueLocalStorage, {
  name: 'lsobj',
  createComputed: true //created computed members from your variable declarations
})
export default  {
  name: 'login',
  components: {},
  props: [],
  data () {
    return {
      loginform:{},
      is_login_email: false,
      loader:false
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    checkAuthentication: function (username, password) {
      LoginAuthentication(username, password, 'static/login.json').then(res => {
        if (res) {
          res.forEach(function (element) {
            Vue.lsobj.set('loginUserName', element.username);
            Vue.lsobj.set('loginName', element.firstname +' '+element.lastname);
            Vue.lsobj.set('loginRole', element.roleId);
            Vue.lsobj.set('rolename', element.rolename);
            this.$router.push('Dashboard');
          }, this);
        }
        else
        {
          alert('Invalid credentials');
        }
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      //alert(JSON.stringify(this.loginform));
      this.checkAuthentication(this.loginform.username, this.loginform.password);
    }
  }
}
