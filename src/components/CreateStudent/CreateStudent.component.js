import SuccessNotification from '../SuccessNotification'
import Multiselect from 'vue-multiselect'
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
  components: {'success-notification': SuccessNotification, Multiselect },
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
    customLabel(option) {
      return `${option.batchname}`
    },
    bindBatches: function() {
      let postData = {};
      postData.status = config.Active;
      PostRequest(this.BaseUrl + 'api/admin/batch/list', postData).then(res => {
          if (res) {
              res.body.message.forEach(function(element) {
                  this.batchOptions.push({
                    id: element.id,
                    batchname: element.batchName
                  })
              }, this);
          }
        })
        .catch(error => {
          console.log(error)
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
            let list = [];
            if(response.student_batches.length > 0){
              response.student_batches.forEach(function(element){
                let batchObject = element.batch;
                if(batchObject){
                    list.push({
                      id: batchObject.id,
                      batchname: batchObject.batchName
                    })
                  }
                }, this);
              this.createstudentform.batch = list;
            }
            if(response.status){
              this.createstudentform.status = true;
            }
            else{
              this.createstudentform.status = false;
            }
          }
        }
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$validator.validateAll().then((result) => {
        if (result) {
          //Making Post Data ==============================================================================
          this.createstudentform.password = config.DEFAULT_PASSWORD;
          //Making Post Data ==============================================================================

          let apiPath = 'api/admin/create/student';
          let isEditMode = this.isEdit;
          if (isEditMode) {
            apiPath = 'api/admin/update/student';
          }
          let BatchIds=[];
          if(this.createstudentform.batch){
            this.createstudentform.batch.forEach(function(element){
              BatchIds.push(element.id);
            }, this);
          }
          if(BatchIds.length > 0)
          {
            this.createstudentform.batch = BatchIds;
          }
          PostRequest(this.BaseUrl + apiPath, this.createstudentform)
            .then(res => {
              if (res && res.status == 200) {
                  let msg = isEditMode ? 'Student updated successfully' : 'Student created successfully';
                  this.$swal({
                    type: 'success',
                    title: 'Done !',
                    text: msg,
                    allowOutsideClick: false,
                    showConfirmButton: true
                  }).then((result) => {
                    if (result) {
                      this.$router.push('/Dashboard/StudentList');
                    }
                  });
                } else {
                  this.$swal({
                      type: 'error',
                      title: 'Sorry !',
                      text: res.statustext || 'Please try again after some time !',
                  });
                  this.$forceUpdate();
                }
            })
            .catch(error => {
              console.log(error)
            });
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
