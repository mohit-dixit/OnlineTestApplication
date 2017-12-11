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
    this.errorMessage = null;
    this.BaseUrl = config.BASE_URL;
    this.notifySuccess = false;
    this.notifyError = false;
    this.isEdit = false;
    this.submitButtonText = 'Create';
    //this.rows = [];
    return {
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
      let subjects = [];
      this.rows.map(function(value, key) {
        subjects.push(value.title);
      });
      let request = {
        className : this.createsubjectform.className,
        subjects : subjects
      }
      let apiPath = 'api/admin/create/class';
      let isEditMode = this.isEdit;
      if(isEditMode){
        apiPath = 'api/admin/update/subject';
      }
      PostRequest(this.BaseUrl + apiPath  , request).then(res => {
        debugger;
        if (res) {
          if (res.status == 200) {
            this.createsubjectform = {};
            if(isEditMode){
              alert('Class & Subjects updated successfully')
              this.$router.push('/Dashboard/Masters/SubjectList');
            }
            else{
              this.responseMessage = 'Class and Subjects created successfully';
              this.notifySuccess = true;
              this.notifyError = false;
              this.$router.push('/Dashboard/Masters/SubjectList');
            }
          } else {
            this.errorMessage = res.statusText;
            this.notifySuccess = false;
            this.notifyError = true;
          }
        }
      });
    },
    onlyNumberKey: function(event) {
      return NumberKeyValidation(event);
    },
    addRow: function() {
      var elem = document.createElement('tr');
      this.rows.push({ title: '' });
    },
    removeElement: function(index) {
      this.rows.splice(index, 1);
    },
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
