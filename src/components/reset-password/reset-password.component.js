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
    validateResetToken: function () {
      let postData = {};
      postData.resetToken = this.token;
      PostRequest(this.BaseUrl + 'api/superAdmin/validateResetToken', postData).then(res => {
        if (!res.body.message) {
          this.$swal({
            type: 'error',
            title: 'Invalid Token',
            text: "Token is not valid",
            allowOutsideClick: false,
            showConfirmButton: true
          }).then((result) => {
            if (result) {
              this.$router.push('/');
            }
          });
        }
      });
    },
    resetPasswordCall(evt) {
          evt.preventDefault();
          this.$validator.validateAll().then((result) => {
            if (result) {
                if(this.resetform.password != this.resetform.cnfpassword){
                    this.$swal({
                      type: 'error',
                      title: 'Invalid Password',
                      text: "Password and Confirm Password must be same.",
                      allowOutsideClick: false,
                      showConfirmButton: true
                    }).then((result) => {
                      if (result) {
                        return;
                      }
                    });
                }
                else{
                    this.loader = true;
                    this.resetform.password = btoa(this.resetform.password);
                    this.resetform.resetToken = this.token;
                    PostRequest(this.BaseUrl + 'api/superAdmin/reset/password', this.resetform)
                    .then(res => {
                      if(res){
                        this.loader = true;
                        this.$swal({
                          type: 'success',
                          title: 'Password changed',
                          text: "You have changed your password successfully.",
                          allowOutsideClick: false,
                          showConfirmButton: true
                        }).then((result) => {
                          if (result) {
                            this.$router.push('/');
                          }
                        });
                      }
                    })
                    .catch(err => {
                      console.log(err);
                      this.loader = false;
                    })
              }
            }
        });
    },
  },
  created: function () {
    if(this.token){
      this.validateResetToken();
    }
  }
}
