import Dashboard from '../Dashboard/index.vue'
import Vue from 'vue'
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'

export default  {
  name: 'start-test',
  components: {'dashboard' : Dashboard},
  props: [],
  data () {
    this.testList = [];
    return {
      variants: [
        'primary','secondary','success','warning','danger','info','light','dark'
       ],
       headerBgVariant: 'dark',
       headerTextVariant: 'light',
       bodyBgVariant: 'light',
       bodyTextVariant: 'dark',
       footerBgVariant: 'warning',
       footerTextVariant: 'dark',
     }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
     //Controls bindings
     getTestsList: function(){
      GetRequest('static/test.json').then(res => {this.testList = res; this.$forceUpdate();});
    },

    startTestClick: function (events, args) {
      alert('clicked');
      //this.$router.push('/Dashboard/CreateAdmin', 1);
    }

  },
  created: function () {
    this.getTestsList();
  }
}
