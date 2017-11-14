import Vue from "vue";
import {GetRequest, PostRequest} from '../../utils/globalservice'
export default {
  name: 'masters',
  props: [],
  data() {
    return {

    }
  },
  components: {

  },
  computed: {

  },
  mounted() {

  },
  methods: {

  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
  }
}
