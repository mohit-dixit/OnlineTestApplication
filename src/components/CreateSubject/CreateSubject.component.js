import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import * as config from '../../config/constants.js'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'
export default {
  name: 'create-subject',
  components: {},
  props: ['id', 'name'],
  data() {
    this.responseMessage = null;
    this.ModalMessage = null;
    this.errorMessage = null;
    this.BaseUrl = config.BASE_URL;
    this.notifySuccess = false;
    this.notifyError = false;
    this.isEdit = false;
    this.submitButtonText = 'Create';
    return {
      variants: [
        'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'
      ],
      headerBgVariant: 'dark',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'dark',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark',
      createsubjectform: {},
      rows: []
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
      PostRequest(this.BaseUrl + apiPath , this.createsubjectform).then(res => {
        if (res) {
          if (res.status == 200) {
            this.createsubjectform = {};
            if(isEditMode){
              this.ModalMessage = 'Subject updated successfully';
              this.$refs.notificationModal.show();
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
    closeModal: function (events, args) {
      this.$router.push('/Dashboard/Masters/SubjectList');
    },
    onlyNumberKey: function(event) {
      return NumberKeyValidation(event);
    }
  },
  created: function() {
    this.loginRole = Vue.lsobj.get('loginRole');
    if (this.id) {
      this.submitButtonText = 'Update';
      this.isEdit = true;
      this.createsubjectform.id = this.id;
      this.createsubjectform.subjectName = this.name;
    }
  }
}
