import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import * as config from '../../config/constants.js'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'
export default  {
  name: 'create-topic',
  components: {},
  props: ['id','subjectId','name','status'],
  data() {
    this.responseMessage = null;
    this.ModalMessage = null;
    this.errorMessage = null;
    this.BaseUrl = config.BASE_URL;
    this.notifySuccess = false;
    this.notifyError = false;
    this.isEdit = false;
    this.submitButtonText ='Create';
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
      createtopicform: { subjectId:null },
      subjectOptions: []
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    bindSubjects: function () {
      let postData = {};
      postData.status = config.Active;
      PostRequest(this.BaseUrl + 'api/admin/subject/list', postData).then(res => {
        this.subjectOptions.push({
          value: null,
          text: 'Select Subject'
        })
        if (res.status) {
          let response = res.body.message;
          if(response){
            response.forEach(function (element) {
              this.subjectOptions.push({
                value: element.id,
                text: element.subjectName
              })
            }, this);
          }
        }
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$validator.validateAll().then((result) => {
        if (result) {
          let apiPath = 'api/admin/create/topic';
          let isEditMode = this.isEdit;
          if(isEditMode){
            apiPath = 'api/admin/update/topic';
          }
          PostRequest(this.BaseUrl + apiPath  , this.createtopicform).then(res => {
            if (res) {
              if (res.status == 200) {
                let msg = isEditMode ? 'Topic updated successfully' : 'Topic created successfully';
                if(isEditMode){
                  this.$swal({
                    title: 'Great !',
                    text: msg,
                    type: 'success',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    allowOutsideClick: false,
                    confirmButtonText: 'OK'
                  }).then((result) => {
                    if (result) {
                      this.$router.push('/Dashboard/Masters/TopicList');
                    }
                  })

                }
                else{
                  this.$swal({
                    type: 'success',
                    allowOutsideClick: false,
                    title: msg
                  }).then((result) => {
                    if (result) {
                      this.$router.push('/Dashboard/Masters/TopicList');
                    }
                  })
                }
              } else {
                this.errorMessage = res.statustext || 'Please try again after some time !';
                this.notifySuccess = false;
                this.notifyError = true;
              }
            }
          });
        }
      });
    },
    closeModal: function (events, args) {
      this.$router.push('/Dashboard/Masters/TopicList');
    },
    onlyNumberKey: function (event) {
      return NumberKeyValidation(event);
    }
  },
  created: function () {
    this.bindSubjects();
    this.loginRole = Vue.lsobj.get('loginRole');
    if (this.id) {
      this.submitButtonText = 'Update';
      this.isEdit = true;
      this.createtopicform.topic_id = this.id;
      this.createtopicform.topicName = this.name;
      this.createtopicform.subjectId = this.subjectId;
      this.createtopicform.status = this.status == 'Active' ? true : false;
    }
  }
}
