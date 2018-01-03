import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage';
import * as config from '../../config/constants.js'
import {
  GetRequest,
  PostRequest,
  LoginAuthentication
} from '../../utils/globalservice'

export default {
  name: 'forgot-password',
  components: { },
  props: [],
  data() {
    this.BaseUrl = config.BASE_URL;
    return {
      forgotform: {},
      is_login_email: false,
      loader: false
    }
  },
  methods: {
    forgotPasswordAPI(evt) {
      evt.preventDefault();
      this.loader = true;
      console.log(this.forgotform, "forgot form data before post");
      PostRequest(this.BaseUrl + 'api/superAdmin/forgot-password', this.forgotform)
      .then(res => {
        this.loader = false;
        console.log(res, "response");
        if (res && res.body.message.res.length) {
          this.$swal({
            type: 'success',
            title: 'Reset link sent',
            text: "Reset link has been sent to your email. Please reset your password.",
            allowOutsideClick: false,
            showConfirmButton: true
          }).then((result) => {
            if (result) {
              this.$router.push('/reset-password/'+ res.body.message.token);
            }
          });
        }
        else{
          this.$swal({
            type: 'error',
            title: 'Invalid Email',
            text: "Please enter valid Email",
            allowOutsideClick: false,
            showConfirmButton: true
          }).then((result) => {
            if (result) {
              this.$router.push('/');
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
}
