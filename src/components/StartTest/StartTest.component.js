import Vue from 'vue'
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'

export default  {
  name: 'start-test',
  components: {},
  props: [],
  data () {
    this.testList = [];
    return {
      columnsTest: [
        {
          label: 'Name',
          field: 'name',
          filterable: true,
          width:'20%'
        },
        {
          label: 'Time',
          field: 'time',
          filterable: true,
          width:'17%'
        },
        {
          label: 'Valid By',
          field: 'validby',
          filterable: true,
          width:'20%'
        },
        {
          label: 'Status',
          field: 'status',
          width:'20%'
        }
        ,
        {
          label: 'Result',
          field: 'result',
          width:'15%'
        },
        {
          label: 'Action',
          width:'5%'
        }
      ],
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
      this.$router.push('/Test')
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.getTestsList();
  }
}
