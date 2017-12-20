import Vue from "vue";
import {GetRequest, PostRequest} from '../../utils/globalservice';
import * as config from '../../config/constants.js';

export default  {
  name: 'test-list',
  components: {},
  props: [],
  data () {
    this.BaseUrl = config.BASE_URL;
    this.testList = [];
    return {
      columnsTests: [
        {
          label: 'Test Name',
          field: 'testname',
          filterable: true
        },
        {
          label: 'Test Time (In Minutes)',
          field: 'testtime',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },
        {
          label: 'No. Of Questions',
          field: 'noofquestions',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },
        {
          label: 'Total Marks',
          field: 'totalmarks',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
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
    bindTestList: function () {
      GetRequest(this.BaseUrl + 'api/admin/test/list')
        .then(res => {
          if (res.status) {
            let response = res.result.message;
            let list = [];
            response.forEach(function (element) {
              list.push({
                id: element.id || '-',
                testname: element.testName || 'Test Name',
                testtime: element.testTime || '-',
                noofquestions: element.noOfQuestions || '-',
                totalmarks: '100',
                status: element.status == '1' ? 'Active' : 'Inactive'
              })
            }, this);
            this.testList = list;
            this.$forceUpdate();
          }
          else{
            this.instituteList = [];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTestList: function(){
      GetRequest('static/question.json').then(res => {this.testList = res; this.$forceUpdate();});
    },
    editTestClick: function (test) {
      debugger;
      this.$router.push('/Dashboard/EditTest/' + test.row.id);
    },
    deleteTestClick: function (events, args) {
      this.$router.push('/Dashboard/CreateAdmin', 1);
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.bindTestList();
  }
}
