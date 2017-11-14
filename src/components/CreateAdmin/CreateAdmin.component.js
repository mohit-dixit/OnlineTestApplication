import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import * as config from '../../config/constants.js'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'

export default {
  name: 'create-admin',
  components: {},
  props: [],
  data() {
    this.responseMessage = null;
    this.errorMessage = null;
    this.BaseUrl = config.BASE_URL;
    this.notifySuccess = false;
    this.notifyError = false;
    return {
      createadminform: {
        associatedwith: null,
        name: ''
      },
      associatedOptions: []
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    //Controls bindings
    bindInstitutes: function () {
      GetRequest(this.BaseUrl + 'api/superAdmin/institute/list').then(res => {
        this.associatedOptions.push({
          value: null,
          text: '--Select Institute--'
        })
        if (res.status) {
          let response = res.result.message;
          response.forEach(function (element) {
            this.associatedOptions.push({
              value: element.id,
              text: element.name
            })
          }, this);
        }
      });
    },

    onSubmit(evt) {
          evt.preventDefault();
          //Making Post Data ==============================================================================
              this.createadminform.username = this.createadminform.email;
              this.createadminform.instituteId = this.createadminform.associatedwith;
              this.createadminform.password = config.DEFAULT_PASSWORD;
              this.createadminform.token = Vue.lsobj.get('loginToken');
          //Making Post Data ==============================================================================
          PostRequest(this.BaseUrl + 'api/superAdmin/create/admin', this.createadminform).then(res => {
            if (res) {
              if(res.status == 200)
              {
                this.createadminform = {};
                this.responseMessage = 'Admin created successfully';
                this.notifySuccess = true;
                this.notifyError = false;
              }
              else
              {
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
    this.bindInstitutes();
  }
}
