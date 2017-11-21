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
  props: ['id','name','points'],
  data() {
    this.responseMessage = null;
    this.errorMessage = null;
    this.BaseUrl = config.BASE_URL;
    this.notifySuccess = false;
    this.notifyError = false;
    this.isEdit = false;
    this.submitButtonText ='Create';
    return {
      createscaleform: {},
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    onSubmit(evt) {
      let apiPath = 'api/admin/create/scale';
      let isEditMode = this.isEdit;
      if(isEditMode){
        apiPath = 'api/admin/update/scale';
      }
      PostRequest(this.BaseUrl + apiPath  , this.createscaleform).then(res => {
        if (res) {
          if (res.status == 200) {
            this.createscaleform = {};
            if(isEditMode){
              alert('Scale updated successfully')
              this.$router.push('/Dashboard/Masters/ScaleList');
            }
            else{
              this.responseMessage = 'Scale created successfully';
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
      this.createscaleform.id = this.id;
      this.createscaleform.scaleName = this.name;
      this.createscaleform.scalePoint = this.points;
    }
  }
}
