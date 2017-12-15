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
      createinstituteform: {},
      createinstituteData: {}
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    resetEdit: function() {
      debugger;
      this.createinstituteform = this.createinstituteData;
    },
    bindInstituteData: function () {
      let postData = {};
      postData.id = this.id;
      PostRequest(this.BaseUrl + 'api/superAdmin/edit/institute', postData)
      .then(res => {
        if (res && res.status) {
          let response = res.body.message[0];
          this.createinstituteform = response;
          this.createinstituteData = response;
        }
      })
      .catch(error => {
        console.log(error);
      });
    },

    activeToggle : function(event) {
      console.log(event);
    },
    onSubmit(evt) {
      evt.preventDefault();
      let apiPath = 'api/superAdmin/create/institute';
      let isEditMode = this.isEdit;
      if(isEditMode){
        apiPath = 'api/superAdmin/update/institute';
      }
      
      PostRequest(this.BaseUrl + apiPath  , this.createinstituteform).then(res => {
        if (res && res.status == 200) {
            this.createinstituteform = {};
            
            let msg = '';
            if(isEditMode){
              msg = 'Institute updated successfully';
            }
            else{
              msg = 'Institute created successfully';
            }

            this.$swal({
              type: 'success',
              title: 'Congratulation !',
              text: msg,
              showConfirmButton: true
            }).then((result) => {
              if (result) {
                this.$router.push('/Dashboard/InstituteList');
              }
            });

          } else {
            this.errorMessage = res.statusText;
            this.notifySuccess = false;
            this.notifyError = true;
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
