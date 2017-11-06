import SuccessNotification from '../SuccessNotification'
import Vue from 'vue'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'

export default  {
  name: 'create-student',
  components: {'success-notification': SuccessNotification},
  props: [],
  data() {
    this.notifySuccess = false;
    return {
      createstudentform: {},
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.createstudentform));
      this.createstudentform = {};
      this.notifySuccess = true;
      //this.$router.push('/Dashboard')
    },
    onlyNumberKey: function (event) {
      return NumberKeyValidation(event);
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
  }
}
