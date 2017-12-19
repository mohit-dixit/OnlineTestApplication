import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage';
import * as config from '../../config/constants.js'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'
var $ = window.jQuery = require('jquery')
Vue.use(VueLocalStorage, {
  name: 'lsobj',
  createComputed: true //created computed members from your variable declarations
})

export default  {
  name: 'edit-profile',
  components: {},
  props: [],
  data () {
    this.BaseUrl = config.BASE_URL;
    return {
      profileData: {},
      image: '',
      localImage: null,
      loader: false
    }
  },
  methods: {
    bindProfileData: function () {
      this.loader = true;
      GetRequest(this.BaseUrl + 'api/superAdmin/profile')
        .then(res => {
          this.loader = false;
          if (res) {
            this.profileData = res.result.message[0];
          }
        })
        .catch(error => {
          this.loader = false;
          console.log(error);
        });
    },
    cancelClick : function(){
      this.$router.push('/Dashboard/Profile');
    },
    editImageFunction: function() {
        $("#imageUrl").click();
    },
    updateClick: function(){
      this.$validator.validateAll().then((result) => {
        if (result) {
          let formData = new FormData();
          formData.append('firstname', this.profileData.firstname);
          formData.append('lastname', this.profileData.lastname);
          formData.append('phone', this.profileData.phone);
          formData.append('username', this.profileData.username);
          formData.append('desciption', this.profileData.desciption);
          formData.append('image', this.profileData.image);

          console.log(this.profileData, formData, "Data on Uploading image and Profile");
          this.loader = true;
          PostRequest(this.BaseUrl + 'api/superAdmin/profile/update', formData)
            .then(res => {
              this.loader = false;
              Vue.lsobj.set('loginName', this.profileData.firstname + ' ' + this.profileData.lastname);
              this.$forceUpdate();
              console.log(res, "on Updation of profile");
              this.$router.push('/Dashboard/Profile');
            })
            .catch(error => {
              this.loader = false;
              console.log(error);
            });
          }
        });
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
      this.profileData.image = files[0];
    },
    createImage(file) {
      // console.log(file, "File--------");
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        this.localImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  },
  created: function () {
    this.bindProfileData();
  }
}
