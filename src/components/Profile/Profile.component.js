import Vue from 'vue'
import * as config from '../../config/constants.js'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'

export default  {
  name: 'profile',
  components: {},
  props: [],
  data () {
    this.isEditMode = false;
    this.BaseUrl = config.BASE_URL;
    return {
      profileData: {},
      image: ''
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    bindProfileData: function () {
      GetRequest(this.BaseUrl + 'api/superAdmin/profile')
        .then(res => {
          if (res) {
            this.profileData = res.result.message[0];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    editButtonClick : function(){
      this.$router.push('/Dashboard/edit-profile');
      /* this.isEditMode = true;
      this.$forceUpdate(); */
    },
    cancelClick : function(){
      this.isEditMode = false;
      this.$forceUpdate();
    },
    updateClick: function(){
      console.log(this.profileData);
      PostRequest(this.BaseUrl + 'api/superAdmin/profile/update', this.profileData)
        .then(res => {
          this.isEditMode = false;
          console.log(res, "on Updation of profile");
        })
        .catch(error => {
          console.log(error);
        });
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      console.log(file, "File--------");
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        this.profileData.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  },
  created: function () {
    this.bindProfileData();
  },
}
