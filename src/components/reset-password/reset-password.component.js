import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage';
import {RotateSquare2} from 'vue-loading-spinner';
import * as config from '../../config/constants.js'
import {
  GetRequest,
  PostRequest,
  LoginAuthentication
} from '../../utils/globalservice'
var $ = window.jQuery = require('jquery') 

// var $ = '';
Vue.use(VueLocalStorage, {
  name: 'lsobj',
  createComputed: true //created computed members from your variable declarations
})
export default {
  name: 'reset-password',
  components: {
    RotateSquare2
  },
  props: ["token"],
  data() {
    this.errorMessage = null;
    this.loader = false;
    this.BaseUrl = config.BASE_URL;
    return {
      resetform: {},
      is_login_email: false,
      loader: false
    }
  },
  methods: {
    resetPasswordCall(evt) {
      evt.preventDefault();
      this.loader = true;
      this.resetform.password = btoa(this.resetform.password);
      console.log(this.resetform,'form value');
      PostRequest(this.BaseUrl + 'api/superAdmin/login', this.loginform)
      .then(res => {
        this.loader = false;
      })
      .catch(err => {
        console.log(err);
        this.loader = false;
      })
    }, 
  },
  created: function () {
    console.log(this.token, "Token from password changes");
  }
}
