import Vue from 'vue'

export default  {
  name: 'dashboard',
  components: {},
  props: [],
  data () {
    return {
      loginUserName: Vue.lsobj.get('loginUserName'),
      loginRole : Vue.lsobj.get('loginRole')
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    logout() {
      localStorage.clear();
    }
  }
}
