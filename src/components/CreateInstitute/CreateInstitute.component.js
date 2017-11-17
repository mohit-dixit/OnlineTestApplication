import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import * as config from '../../config/constants.js'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'
export default {
  name: 'create-institute',
  components: {},
  props: ['id'],
  data() {
    this.responseMessage = null;
    this.errorMessage = null;
    this.BaseUrl = config.BASE_URL;
    this.notifySuccess = false;
    this.notifyError = false;
    this.isEdit = false;
    this.submitButtonText ='Create';
    return {
      createinstituteform: {}
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    bindInstituteData: function () {
      let postData = {};
      postData.id = this.id;
      PostRequest(this.BaseUrl + 'api/superAdmin/edit/institute', postData).then(res => {
        if (res) {
          if (res.status) {
            let response = res.body.message[0];
            this.createinstituteform = response;
          }
        }
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      let apiPath = 'api/superAdmin/create/institute';
      let isEditMode = this.isEdit;
      if(isEditMode){
        apiPath = 'api/superAdmin/update/institute';
      }
      PostRequest(this.BaseUrl + apiPath  , this.createinstituteform).then(res => {
        if (res) {
          if (res.status == 200) {
            this.createinstituteform = {};
            if(isEditMode){
              alert('Institute updated successfully')
              this.$router.push('/Dashboard/InstituteList');
            }
            else{
              this.responseMessage = 'Institute created successfully';
              this.notifySuccess = true;
              this.notifyError = false;
            }
          } else {
            this.errorMessage = res.statusText;
            this.notifySuccess = false;
            this.notifyError = true;
          }
        }
      });
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    if (this.id) {
      this.submitButtonText = 'Update';
      this.isEdit = true;
      this.bindInstituteData();
    }
  }
}
