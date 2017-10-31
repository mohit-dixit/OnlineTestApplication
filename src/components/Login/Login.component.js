import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
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
    signIn(provider){
      this.loader = true;
      this.sub = this._auth.login(provider).subscribe(
        (data) => {
          console.log(data);
          this.user=data;
          let obj = {email: this.user.email , facebook_auth: true }
          this.loginFun(obj);
        },
        err => {
          console.log(err,"Error in Login via social media");
        })
    },
    onSubmit(evt) {
      evt.preventDefault();
      //alert(JSON.stringify(this.loginform));
      Vue.lsobj.set('loginUserName', this.loginform.username);
      Vue.lsobj.set('loginRole', 'Super Admin');
      this.$router.push('Dashboard');
    }
  }
}
