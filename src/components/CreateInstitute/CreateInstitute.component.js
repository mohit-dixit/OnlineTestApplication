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
      this.$validator.validateAll().then((result) => {
        if (result) {
          let apiPath = 'api/superAdmin/create/institute';
          let isEditMode = this.isEdit;
          if(isEditMode){
            apiPath = 'api/superAdmin/update/institute';
          }

          PostRequest(this.BaseUrl + apiPath  , this.createinstituteform).then(res => {
            if (res && res.status == 200) {
                let msg = isEditMode ? 'Institute updated successfully' : 'Institute created successfully';
                this.$swal({
                  type: 'success',
                  title: 'Congratulation !',
                  allowOutsideClick: false,
                  text: msg,
                  showConfirmButton: true
                }).then((result) => {
                  if (result) {
                    this.$router.push('/Dashboard/InstituteList');
                  }
                });

              } else {
                this.$swal({
                    type: 'error',
                    title: 'Sorry !',
                    text: res.statustext || 'Please try again after some time !',
                });
              }
          });
        }
      })
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
