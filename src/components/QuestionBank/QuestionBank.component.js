import Vue from "vue";
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'
import * as config from '../../config/constants.js'
export default  {
  name: 'question-bank',
  components: {},
  props: [],
  data () {
    this.BaseUrl = config.BASE_URL;
    this.questionList = [];
    return {
      columnsQuestions: [
        {
          label: 'Id',
          field: 'id',
          hidden : true
        },
        {
          label: 'Question',
          field: 'question',
          filterable: true,
        },
        {
          label: 'Scale',
          field: 'scale',
          filterable: true,
        },
        {
          label: 'Subject',
          field: 'subject',
          filterable: true,
        },
        {
          label: 'Topic',
          field: 'topic',
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
    getQuestionList: function(){

      GetRequest(this.BaseUrl + 'api/admin/question/list').then(res => {
        if (res.status) {
          let response = res.result.message;
          let list = [];
          if(response){
            response.forEach(function (element) {
              list.push({
                id: element.id,
                question: element.question,
                scale: element.scale.scaleName,
                subject: element.subject.subjectName,
                topic: element.topic.topicName
              })
            }, this);
          }
          this.questionList = list;
          this.$forceUpdate();
        }
      });
    },
    editQuestionClick: function (events, args) {
      this.$router.push({
        name: 'EditQuestion',
        params: {
          id: events.row.id
        }
      });
    },
    deleteQuestionClick: function (events, args) {
      this.$router.push('/Dashboard/CreateAdmin', 1);
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.getQuestionList();
  }
}
