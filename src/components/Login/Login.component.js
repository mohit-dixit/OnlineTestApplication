import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import * as config from '../../config/constants.js'
import {
  GetRequest,
  PostRequest,
  LoginAuthentication
} from '../../utils/globalservice'

Vue.use(VueLocalStorage, {
  name: 'lsobj',
  createComputed: true //created computed members from your variable declarations
})
export default {
  name: 'login',
  components: {},
  props: [],
  data() {
    this.errorMessage = null;
    this.BaseUrl = config.BASE_URL;
    return {
      loginform: {},
      is_login_email: false,
      loader: false
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    checkAuthentication: function () {
      LoginAuthentication(this.BaseUrl + 'api/superAdmin/login', this.loginform).then(res => {
        if (res) {
          if (res.requestcode > 0) {
              let loginUserDetails = res.responsedata;
              Vue.lsobj.set('loginUserName', loginUserDetails[0].username);
              Vue.lsobj.set('loginName', loginUserDetails[0].firstname + ' ' + loginUserDetails[0].lastname);
              Vue.lsobj.set('loginRole', loginUserDetails[0].user_roles[0].role.id);
              Vue.lsobj.set('rolename', loginUserDetails[0].user_roles[0].role.rolename);
              Vue.lsobj.set('loginToken', loginUserDetails[0].token);
              this.$router.push('Dashboard');
          } else {
              this.errorMessage = res.responsedata;
              this.$forceUpdate();
          }
        }
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      //alert(JSON.stringify(this.loginform));
      this.checkAuthentication();
    }
  }
}