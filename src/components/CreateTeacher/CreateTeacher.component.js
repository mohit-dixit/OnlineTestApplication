import SuccessNotification from '../SuccessNotification'
import Vue from 'vue'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'

export default {
  name: 'create-teacher',
  components: {
    'success-notification': SuccessNotification
  },
  props: [],
  data() {
    this.notifySuccess = false;
    return {
      value: [{
        text: 'Easy',
        value: 1
      },
      {
        text: 'Medium',
        value: 2
      },
      {
        text: 'Difficult',
        value: 3
      }
    ],
    scaleOptions: [{
        text: 'Easy',
        value: 1
      },
      {
        text: 'Medium',
        value: 2
      },
      {
        text: 'Difficult',
        value: 3
      }
    ],
      createteacherform: {},
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.createteacherform));
      this.createteacherform = {};
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
