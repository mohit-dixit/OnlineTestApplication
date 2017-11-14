import Vue from "vue";
import {GetRequest, PostRequest} from '../../utils/globalservice'
export default  {
  name: 'test-list',
  components: {},
  props: [],
  data () {
    this.testList = [];
    return {
      columnsTests: [
        {
          label: 'Test Name',
          field: 'testname',
          filterable: true,
        },
        {
          label: 'Test Time (In Minutes)',
          field: 'testtime',
          filterable: true,
        },
        {
          label: 'No. Of Questions',
          field: 'noofquestions',
          filterable: true,
        },
        {
          label: 'Total Marks',
          field: 'totalmarks',
          filterable: true,
        },
        {
          label: 'Action'
        }
      ]
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    getTestList: function(){
      GetRequest('static/question.json').then(res => {this.testList = res; this.$forceUpdate();});
    },
    editTestClick: function (events, args) {
      this.$router.push('/Dashboard/CreateAdmin', 1);
    },
    deleteTestClick: function (events, args) {
      this.$router.push('/Dashboard/CreateAdmin', 1);
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.testList.push({
      testname: 'Test Name 1',
      testtime: '60',
      noofquestions: '30',
      totalmarks: '100'
    });
  }
}
