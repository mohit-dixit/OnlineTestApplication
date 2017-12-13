import SuccessNotification from '../SuccessNotification'
import VueLocalStorage from 'vue-localstorage'
import * as config from '../../config/constants.js'
import Vue from 'vue'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'

export default  {
  name: 'create-student',
  components: {'success-notification': SuccessNotification},
  props: ['id'],
  data() {
    this.responseMessage = null;
    this.errorMessage = null;
    this.BaseUrl = config.BASE_URL;
    this.notifySuccess = false;
    this.notifyError = false;
    this.isEdit = false;
    this.submitButtonText = 'Create';
    return {
      createstudentform: {associatedbatch: null},
      batchOptions: []
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    bindBatches: function () {
      GetRequest(this.BaseUrl + 'api/admin/batch/list').then(res => {
        this.batchOptions.push({
          value: null,
          text: '--Select Batch--'
        })
        if (res.status) {
          let response = res.result.message;
          if(response){
            response.forEach(function (element) {
              this.batchOptions.push({
                value: element.id,
                text: element.batchName
              })
            }, this);
          }
        }
      });
    },
    getStudentData: function () {
      let postData = {};
      postData.id = this.id;
      PostRequest(this.BaseUrl + 'api/admin/edit/student', postData).then(res => {
        if (res) {
          if (res.status) {
            let response = res.body.message;
            this.createstudentform = response;
          }
        }
      });
    },
    onSubmit(evt) {
      evt.preventDefault();

       //Making Post Data ==============================================================================
       this.createstudentform.password = config.DEFAULT_PASSWORD;
       //Making Post Data ==============================================================================

      let apiPath = 'api/admin/create/student';
      let isEditMode = this.isEdit;
      if (isEditMode) {
        apiPath = 'api/admin/update/student';
      }
      PostRequest(this.BaseUrl + apiPath, this.createstudentform).then(res => {
        if (res) {
          if (res.status == 200) {
            this.createstudentform = {};
            if (isEditMode) {
              alert('Student updated successfully')
              this.$router.push('/Dashboard/StudentList');
            } else {
              this.notifySuccess = true;
              this.notifyError = false;
              this.responseMessage = 'Student created successfully';
              this.$forceUpdate();
            }
          } else {
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
    this.bindBatches();
    this.loginRole = Vue.lsobj.get('loginRole');
    if (this.id) {
      this.submitButtonText = 'Update';
      this.isEdit = true;
      this.getStudentData();
    }
  }
}
