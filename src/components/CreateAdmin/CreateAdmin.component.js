import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import * as config from '../../config/constants.js'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'
import Multiselect from 'vue-multiselect'
export default {
  name: 'create-admin',
  components: { Multiselect },
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
      createadminform: {
        associatedwith: null,
        name: ''
      },
      createadminformClone: {},
      associatedOptions: []
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    /* --ResetONEdit method -- */
    /* resetOnEdit: function() {
      console.log(this.createadminform, this.createadminformClone);
      this.createadminform = Object.assign({}, this.createadminformClone);
      this.createadminform.associatedwith = this.createadminformClone.associatedwith
      this.createadminform.status = this.createadminformClone.status;
    }, */
    getAdminData: function () {
      let postData = {};
      postData.id = this.id;
      PostRequest(this.BaseUrl + 'api/superAdmin/edit/admin', postData).then(res => {
        if (res) {
          if(res.status){
            // debugger;
            let response = res.body.message[0];
            this.createadminform = response;
            this.createadminform.associatedwith = response.user_institutes[0].instituteId;
            this.createadminformClone = Object.assign({}, this.createadminform);;
            this.createadminformClone.associatedwith = response.user_institutes[0].instituteId;
            if(response.status){
              this.createadminform.status = true;
              this.createadminformClone.status = true;
            }
            else{
              this.createadminform.status = false;
              this.createadminformClone.status = false;
            }
          }
        }
      });
    },
    bindInstitutes: function () {
      let postData = {};
      postData.status = config.Active;
      PostRequest(this.BaseUrl + 'api/superAdmin/institute/list', postData).then(res => {
        this.associatedOptions.push({
          value: null,
          text: 'Select Institute'
        })
        if (res.status) {
          let response = res.body.message;
          response.forEach(function (element) {
            this.associatedOptions.push({
              value: element.id,
              text: element.name
            })
          }, this);
        }
      });
    },
    onSubmit(evt) {
          evt.preventDefault();
          this.$validator.validateAll().then((result) => {
              if (result) {
            //Making Post Data ==============================================================================
            this.createadminform.instituteId = this.createadminform.associatedwith;
            this.createadminform.password = config.DEFAULT_PASSWORD;
            this.createadminform.token = Vue.lsobj.get('loginToken');
            //Making Post Data ==============================================================================

            let apiPath = 'api/superAdmin/create/admin';
            let isEditMode = this.isEdit;
            if(isEditMode){
              apiPath = 'api/superAdmin/update/admin';
              if(this.createadminform.status){
                this.createadminform.status = config.Active;
              }
              else{
                this.createadminform.status = config.Inactive;
              }
            }
            PostRequest(this.BaseUrl + apiPath, this.createadminform).then(res => {
              if (res && res.status == 200) {
                let msg = isEditMode ? 'Admin updated successfully' : 'Admin created successfully';
                this.$swal({
                  type: 'success',
                  title: 'Done !',
                  allowOutsideClick: false,
                  text: msg,
                  showConfirmButton: true
                }).then((result) => {
                  if (result) {
                    this.$router.push('/Dashboard/AdminList');
                  }
                });
              }
              else {
                this.$swal({
                    type: 'error',
                    title: 'Sorry !',
                    text: res.statustext || 'Please try again after some time !',
                });
                this.$forceUpdate();
              }
          });
        }
      });
    },
    onlyNumberKey: function (event) {
      return NumberKeyValidation(event);
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.bindInstitutes();
    if(this.id){
      this.submitButtonText = 'Update';
      this.isEdit = true;
      this.getAdminData();
    }
  }
}
