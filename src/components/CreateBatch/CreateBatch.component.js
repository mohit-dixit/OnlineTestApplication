import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import * as config from '../../config/constants.js'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'
export default  {
  name: 'create-batch',
  components: {},
  props: ['id','name', 'status'],
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
      createbatchform: {},
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let apiPath = 'api/admin/create/batch';
      let isEditMode = this.isEdit;
      if(isEditMode){
        apiPath = 'api/admin/update/batch';
      }
      PostRequest(this.BaseUrl + apiPath  , this.createbatchform).then(res => {
        if (res) {
          if (res.status == 200) {
            this.createbatchform = {};
            if(isEditMode){
              this.$swal({
                title: 'Great !',
                text: "Batch updated successfully !",
                type: 'success',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
              }).then((result) => {
                if (result) {
                  this.$router.push('/Dashboard/Masters/BatchList');
                }
              })
            }
            else{
              this.$swal({
                type: 'success',
                title: 'Batch created successfully'
              }).then((result) => {
                if (result) {
                  this.$router.push('/Dashboard/Masters/BatchList');
                }
              })
            }
          } else {
            this.$swal({
                type: 'error',
                title: 'Sorry !',
                text: res.statustext || 'Please try again after some time !',
            });
          }
        }
      });
    },
    closeModal: function (events, args) {
      this.$router.push('/Dashboard/Masters/BatchList');
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
      this.createbatchform.id = this.id;
      this.createbatchform.batchName = this.name;
      this.createbatchform.status = this.status == 'Active' ? true : false;
    }
  }
}
