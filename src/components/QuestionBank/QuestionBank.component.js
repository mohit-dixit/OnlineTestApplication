import Vue from "vue";
import {GetRequest, PostRequest} from '../../utils/globalservice'
export default  {
  name: 'question-bank',
  components: {},
  props: [],
  data () {
    this.questionList = [];
    return {
      columnsQuestions: [
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
      GetRequest('static/question.json').then(res => {this.questionList = res; this.$forceUpdate();});
    },
    editQuestionClick: function (events, args) {
      this.$router.push('/Dashboard/CreateQuestion', 1);
    },
    deleteQuestionClick: function (events, args) {
      this.$router.push('/Dashboard/CreateAdmin', 1);
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.questionList.push({
      question: 'asasddsa dsadsad sadsa dadsa dsa dsadsad das das dasds',
      scale: 'Hard',
      subject: 'English'
    });
  }
}
