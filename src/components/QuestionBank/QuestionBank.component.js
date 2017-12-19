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
    this.selectedId = 0;
    return {
      variants: [
        'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'
      ],
      headerBgVariant: 'dark',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'dark',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark',
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
          html: true,
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
      this.selectedId = events.row.id;
      this.$refs.deleteModal.show();
    },
    closeModal: function (events, args) {
      this.$refs.deleteModal.hide();
    },
    deleteConfirmation: function () {
      if (this.selectedId) {
        let postData = {};
        postData.id = this.selectedId;
        PostRequest(this.BaseUrl + 'api/admin/delete/question', postData).then(res => {
          if (res) {
            if (res.status == 200) {
              this.getQuestionList();
              this.$refs.deleteModal.hide();
            }
          }
        });
      }
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.getQuestionList();
  }
}
