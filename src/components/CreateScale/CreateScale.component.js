import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import * as config from '../../config/constants.js'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'

export default {
  name: 'create-scale',
  components: {
  },
  props: ['id','name','points','status'],
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
      createscaleform: {},
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$validator.validateAll().then((result) => {
      if (result) {
        let apiPath = 'api/admin/create/scale';
        let isEditMode = this.isEdit;
        if(isEditMode){
          apiPath = 'api/admin/update/scale';
        }
        PostRequest(this.BaseUrl + apiPath  , this.createscaleform).then(res => {
          if (res && res.status == 200) {
            let msg = isEditMode ? 'Scale updated successfully' : 'Scale created successfully';
              this.$swal({
                type: 'success',
                title: 'Done !',
                allowOutsideClick: false,
                text: msg,
                showConfirmButton: true
              }).then((result) => {
                if (result) {
                  this.$router.push('/Dashboard/Masters/ScaleList');
                }
              });
          }
          else {
            this.$swal({
                type: 'error',
                title: 'Sorry !',
                text: res.statustext || 'Please try again after some time !',
            });
          }
        });
      }
    });
    },
    closeModal: function (events, args) {
      this.$router.push('/Dashboard/Masters/ScaleList');
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
      this.createscaleform.id = this.id;
      this.createscaleform.scaleName = this.name;
      this.createscaleform.scalePoint = this.points;
      this.createscaleform.status = this.status == 'Active' ? true : false;
    }
  }
}
