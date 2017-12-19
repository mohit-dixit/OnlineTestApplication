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
  name: 'login',
  components: {
    RotateSquare2
  },
  props: [],
  data() {
    this.errorMessage = null;
    this.loader = false;
    this.BaseUrl = config.BASE_URL;
    return {
      loginform: {},
      is_login_email: false,
      loader: false
    }
  },
  computed: {

  },
  beforeMount(){
      this.onLoad();
  },
  mounted() {

  },
  methods: {
    checkAuthentication: function() {
      this.loader = true;
      this.loginform.password = btoa(this.loginform.password);
      LoginAuthentication(this.BaseUrl + 'api/superAdmin/login', this.loginform).then(res => {
        if (res) {
          this.loader = false;
          if (res.requestcode > 0) {
            let loginUserDetails = res.responsedata;
            Vue.lsobj.set('loginUserName', loginUserDetails[0].username);
            Vue.lsobj.set('loginName', loginUserDetails[0].firstname + ' ' + loginUserDetails[0].lastname);
            Vue.lsobj.set('loginRole', loginUserDetails[0].user_roles[0].role.id);
            Vue.lsobj.set('loginToken', loginUserDetails[0].token);

            // Vue.lsobj.set('rolename', loginUserDetails[0].user_roles[0].role.rolename);
            if(loginUserDetails[0].user_roles.length == 1) {
              Vue.lsobj.set('rolename', loginUserDetails[0].user_roles[0].role.rolename);
            } else {
              Vue.lsobj.set('rolename', loginUserDetails[0].user_roles[0].role.rolename);
              Vue.lsobj.set('SecondryRolename', loginUserDetails[0].user_roles[1].role.rolename); 
            }

            if (loginUserDetails[0].user_roles[0].role.id == 2) {
              Vue.lsobj.set('instituteID', loginUserDetails[0].user_institutes[0].instituteId);
              Vue.lsobj.set('allow_scale', loginUserDetails[0].user_institutes[0].institute.allow_scale);
              Vue.lsobj.set('allow_student', loginUserDetails[0].user_institutes[0].institute.allow_student);
              Vue.lsobj.set('allow_subject', loginUserDetails[0].user_institutes[0].institute.allow_subject);
              Vue.lsobj.set('allow_batch', loginUserDetails[0].user_institutes[0].institute.allow_batch);
              Vue.lsobj.set('allow_topic', loginUserDetails[0].user_institutes[0].institute.allow_topic);
            }
            this.$router.push('Dashboard');
          } else {
              this.loader = false;
              this.$forceUpdate();
              this.$swal({
                title: 'Wait !',
                text: res.responsedata,
                type: 'error',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
              })
          }
        }
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      //alert(JSON.stringify(this.loginform));
      this.checkAuthentication();
    },
    onLoad() {
      $(".log-in").click(function(){
        debugger;
          $(".signIn").addClass("active-dx");
          $(".signUp").addClass("inactive-sx");
          $(".signUp").removeClass("active-sx");
          $(".signIn").removeClass("inactive-dx");
      });

      $(".back").click(function(){
          $(".signUp").addClass("active-sx");
          $(".signIn").addClass("inactive-dx");
          $(".signIn").removeClass("active-dx");
          $(".signUp").removeClass("inactive-sx");
      });
      // $(".log-in").click(function(){
          /* $(".signIn").addClass("active-dx");
          $(".signUp").addClass("inactive-sx");
          $(".signUp").removeClass("active-sx");
          $(".signIn").removeClass("inactive-dx"); */
      /* document.getElementsByClassName(".log-in").addEventListener('click', function() {
          debugger;
          document.getElementsByClassName("signIn")[0].classList.add("active-dx");
          document.getElementsByClassName("signUp")[0].classList.add("inactive-sx");
          document.getElementsByClassName("signUp")[0].classList.remove("active-sx");
          document.getElementsByClassName("signIn")[0].classList.removeadd("inactive-dx");
      }, false); */

      // $(".back").click(function(){
          /* $(".signUp").addClass("active-sx");
          $(".signIn").addClass("inactive-dx");
          $(".signIn").removeClass("active-dx");
          $(".signUp").removeClass("inactive-sx"); */
      /* document.getElementsByClassName(".back").addEventListener('click', function() {
          document.getElementsByClassName("signUp")[0].classList.add("active-sx");
          document.getElementsByClassName("signIn")[0].classList.add("inactive-dx");
          document.getElementsByClassName("signIn")[0].classList.removeadd("active-dx");
          document.getElementsByClassName("signUp")[0].classList.remove("inactive-sx");
      }, false); */
    }
  }
}
