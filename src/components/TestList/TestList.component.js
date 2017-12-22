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
          label: 'Id',
          field: 'id',
          hidden : true
        },
        {
          label: 'Test Name',
          field: 'testname',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },
        {
          label: 'Test Duration (In Minutes)',
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
          label: 'Status',
          thClass:'text-center',
          tdClass:'text-center'
        },
        {
          label: 'Action',
          thClass:'text-center',
          tdClass:'text-center'
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
                totalmarks: element.totalMarks || '-',
                status: element.status ? 'Active' : 'Inactive'
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
    activeInactiveChange: function(sender, rowVals){
      let row = rowVals.row;
      let postData = {};
      postData.id = row.id;
      postData.status = sender.currentTarget.checked ? 1 : 0;
      postData.type = config.CRUD_CODES.TEST;
      PostRequest(this.BaseUrl + 'api/admin/status/update', postData).then(res => {
        if (res) {
          if (res.status == 200) {
          }
        }
      });
    },
    getTestList: function(){
      GetRequest('static/question.json').then(res => {this.testList = res; this.$forceUpdate();});
    },
    editTestClick: function (test) {
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
