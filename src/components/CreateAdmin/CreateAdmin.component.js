import Vue from 'vue'
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
    this.notifySuccess = false;
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
      GetRequest('static/institute.json').then(res => {
        this.associatedOptions.push({
          value: null,
          text: '--Select Institute--'
        })
        if (res) {
          res.forEach(function (element) {
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
      alert(JSON.stringify(this.createadminform));
      this.createadminform = {};
      this.notifySuccess = true;
      //this.$router.push('/Dashboard')
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
