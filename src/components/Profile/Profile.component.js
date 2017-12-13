import Vue from 'vue'
export default  {
  name: 'profile',
  components: {},
  props: [],
  data () {
    this.isEditMode = false;
    return {
      profile: {
        loginUserName: Vue.lsobj.get('loginName'),
        userEmail : 'mohit.dixit354@gmail.com',
        userPhone:'+91-9968445395',
        aboutMe:'Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna ip sum dolore.'
      }
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    editButtonClick : function(){
      this.isEditMode = true;
      if(this.profile.loginUserName){
        let username = this.profile.loginUserName;
        this.profile.userFirstName = username.split(' ')[0];
        this.profile.userLastName = username.split(' ')[1];
      }
      this.$forceUpdate();
    },
    cancelClick : function(){
      this.isEditMode = false;
      this.$forceUpdate();
    },
    updateClick: function(){
      //Update Logic
    },
  }
}
