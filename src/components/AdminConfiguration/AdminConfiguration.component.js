import SuccessNotification from '../SuccessNotification'
import Vue from 'vue'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'
import Multiselect from 'vue-multiselect'

export default  {
  name: 'admin-configuration',
  components: {
    'success-notification': SuccessNotification,
    Multiselect
  },
  props: [],
  data () {
    return {
      adminconfigurationform: {},
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
    ]
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    onSubmit() {
      alert(JSON.stringify(this.adminconfigurationform));
    }

  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
  }
}
