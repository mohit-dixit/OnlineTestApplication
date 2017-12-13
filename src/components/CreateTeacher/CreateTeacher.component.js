import SuccessNotification from '../SuccessNotification'
import VueLocalStorage from 'vue-localstorage'
import * as config from '../../config/constants.js'
import Vue from 'vue'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'
import Multiselect from 'vue-multiselect'

export default {
  name: 'create-teacher',
  components: {
    'success-notification': SuccessNotification,
    Multiselect
  },
  props: ['id'],
  data() {
    this.responseMessage = null;
    this.classesSubjectArr;
    this.errorMessage = null;
    this.BaseUrl = config.BASE_URL;
    this.notifySuccess = false;
    this.notifyError = false;
    this.isEdit = false;
    this.submitButtonText = 'Create';
    return {
      createteacherform: {},
      selected: null,
      classesoptions: [],
      subjectoptions: []
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    bindSubjects: function() {
      GetRequest(this.BaseUrl + 'api/admin/subject/list').then(res => {
        this.subjectoptions.push({
          subject: null,
          text: '--Select Subject--'
        })
        if (res) {
          res.result.message.forEach(function(element) {
            this.subjectoptions.push({
              value: element.id,
              text: element.subjectName
            })
          }, this);
          this.subjectList = list;
          this.$forceUpdate();
        }
      });
    },
    selectedClass: function(evt) {
      let val = evt.target.value;
      this.classesSubjectArr.forEach(function(element) {
        if (element.className == val) {
          this.subjectoptions = [];
          element.institute_class_subjects.forEach(function(sub) {
            this.subjectoptions.push({
              value: sub.id,
              text: sub.subject
            })
          }, this);
        }
      }, this);
      //Get List of subject on the basis of class and fill the dropdown
    },
    getTeacherData: function() {
      let postData = {};
      postData.id = this.id;
      PostRequest(this.BaseUrl + 'api/admin/edit/teacher', postData).then(res => {
        if (res) {
          if (res.status) {
            let response = res.body.message;
            this.createteacherform = response;
          }
        }
      });
    },
    onSubmit(evt) {
      evt.preventDefault();

      //Making Post Data ==============================================================================
      this.createteacherform.password = config.DEFAULT_PASSWORD;
      //Making Post Data ==============================================================================


      let apiPath = 'api/admin/create/teacher';
      let isEditMode = this.isEdit;
      if (isEditMode) {
        apiPath = 'api/admin/update/teacher';
      }
      PostRequest(this.BaseUrl + apiPath, this.createteacherform).then(res => {
        if (res) {
          if (res.status == 200) {
            this.createteacherform = {};
            if (isEditMode) {
              alert('Teacher updated successfully')
              this.$router.push('/Dashboard/TeacherList');
            } else {
              this.notifySuccess = true;
              this.notifyError = false;
              this.responseMessage = 'Teacher created successfully';
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
    onlyNumberKey: function(event) {
      return NumberKeyValidation(event);
    }
  },
  created: function() {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.bindSubjects();
    if (this.id) {
      this.submitButtonText = 'Update';
      this.isEdit = true;
      this.getTeacherData();

    }
  }
}
