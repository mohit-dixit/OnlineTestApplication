import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import * as config from '../../config/constants.js'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'
import NotificationDialog from '../SuccessNotification'

export default {
  name: 'create-subject',
  components: {
    'notificationdialog' : NotificationDialog
  },
  props: ['id','name'],
  data() {
    this.responseMessage = null;
    this.errorMessage = null;
    this.BaseUrl = config.BASE_URL;
    this.notifySuccess = false;
    this.notifyError = false;
    this.isEdit = false;
    this.submitButtonText ='Create';
    return {
      createsubjectform: {},
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    onSubmit(evt) {
      let apiPath = 'api/admin/create/subject';
      let isEditMode = this.isEdit;
      if(isEditMode){
        apiPath = 'api/admin/update/subject';
      }
      PostRequest(this.BaseUrl + apiPath  , this.createsubjectform).then(res => {
        if (res) {
          if (res.status == 200) {
            this.createsubjectform = {};
            if(isEditMode){
              alert('Subject updated successfully')
              this.$router.push('/Dashboard/Masters/SubjectList');
            }
            else{
              this.responseMessage = 'Subject created successfully';
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
    },
    onlyNumberKey: function (event) {
      return NumberKeyValidation(event);
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    if (this.id) {
      this.submitButtonText = 'Update';
      this.isEdit = true;
      this.createsubjectform.id = this.id;
      this.createsubjectform.subjectName = this.name;
    }
  }
}
