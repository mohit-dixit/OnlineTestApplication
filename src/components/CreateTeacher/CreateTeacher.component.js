import Dashboard from '../Dashboard/index.vue'
import SuccessNotification from '../SuccessNotification'
import Vue from 'vue'
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'

export default {
  name: 'create-teacher',
  components: {
    'dashboard': Dashboard,
    'success-notification': SuccessNotification
  },
  props: [],
  data() {
    this.notifySuccess = false;
    return {
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
    }
  },
  created: function () {}
}
