import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import * as config from '../../config/constants.js'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'

export default {
  name: 'create-admin',
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
      createadminform: {
        associatedwith: null,
        name: ''
      },
      associatedOptions: []
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    getAdminData: function () {
      let postData = {};
      postData.id = this.id;
      PostRequest(this.BaseUrl + 'api/superAdmin/edit/admin', postData).then(res => {
        if (res) {
          if(res.status){
            let response = res.body.message[0];
            this.createadminform = response;
            this.createadminform.associatedwith = response.user_institutes[0].instituteId;
          }
        }
      });
    },
    bindInstitutes: function () {
      GetRequest(this.BaseUrl + 'api/superAdmin/institute/list').then(res => {
        this.associatedOptions.push({
          value: null,
          text: '--Select Institute--'
        })
        if (res.status) {
          let response = res.result.message;
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
          //Making Post Data ==============================================================================
              this.createadminform.instituteId = this.createadminform.associatedwith;
              this.createadminform.password = config.DEFAULT_PASSWORD;
              this.createadminform.token = Vue.lsobj.get('loginToken');
          //Making Post Data ==============================================================================

          let apiPath = 'api/superAdmin/create/admin';
          let isEditMode = this.isEdit;
          if(isEditMode){
            apiPath = 'api/superAdmin/update/admin';
          }
          PostRequest(this.BaseUrl + apiPath, this.createadminform).then(res => {
            if (res) {
              if(res.status == 200)
              {
                this.createadminform = {};
                if(isEditMode){
                  alert('Admin updated successfully')
                  this.$router.push('/Dashboard/AdminList');
                }
                else{
                  this.createadminform.associatedwith = null;
                  this.notifySuccess = true;
                  this.notifyError = false;
                  this.responseMessage = 'Admin created successfully';
                }
              }
              else
              {
                this.errorMessage = res.statustext;
                this.notifySuccess = false;
                this.notifyError = true;
                this.$forceUpdate();
              }
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
