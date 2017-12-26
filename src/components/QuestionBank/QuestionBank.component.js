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
    this.filters={};
    this.questionTypeOptions = [];
    this.subjectOptions = [];
    this.topicOptions = [];
    this.scaleOptions = [];

    this.BaseUrl = config.BASE_URL;
    this.questionList = [];
    this.selectedId = 0;
    return {
      date: new Date(),
      config: {
          format: 'DD/MM/YYYY',
          useCurrent: false,
      },
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
          html: true
        },
        {
          label: 'Scale',
          field: 'scale',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },
        {
          label: 'Subject',
          field: 'subject',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },{
          label: 'Topic',
          field: 'topic',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },
        {
          label: 'Teacher Name',
          field: 'teacherName',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },
        {
          label: 'Date(Created)',
          field: 'createdAt',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        }
        ,{
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

    getQuestionList: function(){
      let postData = {};
      postData.status = null;
      PostRequest(this.BaseUrl + 'api/admin/question/list', postData).then(res => {
        if (res.status) {
          let response = res.body.message;
          let list = [];
          if(response){
            response.forEach(function (element) {
              let teacherName = element.user ? element.user.firstname + ' ' + element.user.lastname : '-';
              list.push({
                id: element.id,
                question: element.question,
                categoryId: element.categoryId,
                options: element.options,
                answer: element.answer,
                scale: element.scale.scaleName,
                subject: element.subject.subjectName,
                topic: element.topic.topicName,
                status: element.status ? 'Active' : 'Inactive',
                createdAt: element.createdAt,
                teacherName: teacherName,
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
    getQuestionDetails(event) {
      console.log(event);
      this.$swal({
        title: '<i><b>'+event.row.question+'</b></i>',
        type: 'info',
        html: '<ul>'+ this.getAnswerOptions(JSON.parse(event.row.options), JSON.parse(event.row.answer)) +'</ul>'
      })
    },
    getAnswerOptions(options, answer) {
      let data = [];

      console.log(options, answer, "OPtion and Answer array");
      options.map(data => {
        answer.map(answerKey => {
          if(Object.keys(data)[0]*1 == Object.keys(answerKey)[0]*1){
            data.active = 'green';
          } else{
            if(data.active == 'green'){
              // let it go as it is
            } else
              data.active = 'red';
          }
        })
      })

      /* Code as per correct response from backedn side */
      /* for(let i=0; i < answer.length; i++) {
        for(let j=0; j < options.length; j++) {
          // console.log(answer[i][i] == options[j][j], answer[i][i], options[j][j], options[j].active)
          if(answer[i][i] == options[j][j]){
            options[j].active = 'green';
          } else {
            if(options[j].active == 'green'){

            } else
              options[j].active = 'red'
          }
        }
      } */

      for(let k = 0; k < options.length; k++) {
        data.push('<li style="color : '+options[k].active+'">'+options[k][k] +'</li>');
      }

      return data;
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
    },
    activeInactiveChange: function(sender, rowVals){
      let row = rowVals.formattedRow;
      let postData = {};
      postData.id = row.id;
      postData.status = sender.currentTarget.checked ? 1 : 0;
      postData.type = config.CRUD_CODES.QUESTION;
      PostRequest(this.BaseUrl + 'api/admin/status/update', postData).then(res => {
        if (res) {
          if (res.status == 200) {
            //this.bindAdmins();
          }
        }
      });
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.getQuestionList();
  }
}
