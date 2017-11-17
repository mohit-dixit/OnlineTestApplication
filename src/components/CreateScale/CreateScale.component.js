import SuccessNotification from '../SuccessNotification'
import Vue from 'vue'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'

export default {
  name: 'create-scale',
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
      alert(JSON.stringify(this.createscaleform));
      this.createscaleform = {};
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
