import Vue from "vue";
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'
import * as config from '../../config/constants.js'
export default {
  name: 'uploads',
  components: {},
  props: [],
  data() {
    return {
      uploads: {type : null},
      options: [{
        value: null,
        text: '--Select Type--'
      },{
        value: 1,
        text: 'Teacher'
      }, {
        value: 2,
        text: 'Student'
      }]
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    handleSelectedFile(convertedData) {
      debugger;
      console.log(convertedData)
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
  }
}
