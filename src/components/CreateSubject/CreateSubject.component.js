import SuccessNotification from '../SuccessNotification'
import Vue from 'vue'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'

export default {
  name: 'create-subject',
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
    subjectOptions: [{
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
      createsubjectform: {},
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.createsubjectform));
      this.createsubjectform = {};
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
