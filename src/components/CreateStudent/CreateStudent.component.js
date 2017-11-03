import Dashboard from '../Dashboard/index.vue'
import SuccessNotification from '../SuccessNotification'
import Vue from 'vue'
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'

export default  {
  name: 'create-student',
  components: {'dashboard' : Dashboard, 'success-notification': SuccessNotification},
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
    }
  },
  created: function () {}
}
