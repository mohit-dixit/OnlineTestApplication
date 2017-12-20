import SuccessNotification from '../SuccessNotification'
import Multiselect from 'vue-multiselect'
import VueLocalStorage from 'vue-localstorage'
import * as config from '../../config/constants.js'
import Datepicker from 'vuejs-datepicker';
import Vue from 'vue'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'

export default {
  name: 'create-test',
  components: {
    Multiselect,
    Datepicker
  },
  props: ['questionArr', 'selectedQuestion', 'id'],
  data() {
    this.toShowRemoveSort = false;
    this.BaseUrl = config.BASE_URL;
    this.showMOdal = false;
    return {
      date: new Date(),
      //Modal Popup Variant
      variants: [
        'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'
      ],
      headerBgVariant: 'dark',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'dark',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark',
      //Modal Popup Variant
      config: {
        format: 'DD/MM/YYYY',
        useCurrent: false,
        minDate: 0
      },
      limit: {
        type: 'fromto',
        from: '2016-01-10',
        to: '2016-01-30'
      },
      questionSortList: [{
        scale: '0',
        subject: '0',
        numberquestions: ''
      }, ],
      createtest: {
        negativemarking: 0,
        points: null,
        scaleId: null,
        subjectId: null,
        categoryId: null,
        topicId: null,
        teacherId: null
      },
      batchOptions: [],
      checkedQuestions: [],
      columns: [{
        label: '',
        field: 'checked',
        filterable: true,
      }, {
        label: 'Scale',
        field: 'scaleName',
        // html: false,
        filterable: true,
      }, {
        label: 'Subject',
        field: 'subjectName',
        // html: false,
        filterable: true,
      }, {
        label: 'Question',
        field: 'question',
        html: true,
        filterable: true,
      }, {
        label: 'Topic',
        field: 'topicName',

        filterable: true,
      }],
      rows: [],
      subjectOptions: [],
      teacherOptions: [],
      topicOptions: [{
        value: null,
        text: 'Select Topic'
      }],
      questionTypeOptions: [{
        value: null,
        text: 'Select Question Type'
      }, {
        value: 1,
        text: 'Single Selection'
      }, {
        value: 2,
        text: 'Multi Selection'
      }]
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    init: function() {
      if (this.questionArr) {
        this.createtest = this.questionArr;
        this.checkedQuestions = this.checkedQuestions.concat(this.selectedQuestion);
      }
      //Find Promise.all type request here
      GetRequest(this.BaseUrl + 'api/admin/batch/list').then(res => {
        if (res) {
          res.result.message.forEach(function(element) {
            this.batchOptions.push({
              id: element.id,
              batchname: element.batchName
            })
          }, this);
        }
      });
      GetRequest(this.BaseUrl + 'api/admin/question/list').then(res => {
        if (res) {
          res.result.message.forEach(function(element) {
            this.rows.push({
              id: element.id,
              scaleName: element.scale.scaleName,
              subjectName: element.subject.subjectName,
              question: element.question,
              topicName: element.topic.topicName,
              checked: false
            })
          }, this);
          this.$forceUpdate();
        }
      });

      this.bindSubjects();
      this.bindTeachers();
    },
    bindTeachers: function() {
      GetRequest(this.BaseUrl + 'api/admin/teacher/list').then(res => {
        this.teacherOptions = [];
        this.teacherOptions.push({
          value: null,
          text: 'Select Teacher'
        });
        if (res.status) {
          let response = res.result.message;
          if (response) {
            response.forEach(function(element) {
              let teacherName = element.firstname + ' ' + element.lastname;
              this.teacherOptions.push({
                value: element.id,
                text: teacherName
              })
            }, this);
          }
        }
      });
    },
    bindSubjects: function() {
      GetRequest(this.BaseUrl + 'api/admin/subject/list').then(res => {
        this.subjectOptions = [];
        this.subjectOptions.push({
          value: null,
          text: 'Select Subject'
        })
        if (res.status) {
          let response = res.result.message;
          if (response) {
            response.forEach(function(element) {
              this.subjectOptions.push({
                value: element.id,
                text: element.subjectName
              })
            }, this);
          }
        }
      });
    },
    showSelectedQuestions() {
      console.log(this.selectedQuestion, "Selected Question in Params");
      if(this.selectedQuestion && this.selectedQuestion.length){
        var steps = [],
            progressStepsArray = [];

        this.$swal.setDefaults({
          confirmButtonText: 'Next &rarr;',
          showCancelButton: true,
          width: 1000,
          progressSteps: progressStepsArray
        })

        for(let i=0; i< this.selectedQuestion.length; i++) {
          progressStepsArray.push(i+1);
          steps.push({
            title: '<i><b>'+ this.selectedQuestion[i].question+'</b></i>',
            html: '<ul>'+ this.getAnswerOptions(JSON.parse(this.selectedQuestion[i].options), JSON.parse(this.selectedQuestion[i].answer)) +'</ul>'
          })
        }

        this.$swal.queue(steps).then((result) => {
          this.$swal.resetDefaults()
        })
      }
    },
    getAnswerOptions(options, answer) {
      let data = [];            
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
      
      for(let k = 0; k < options.length; k++) {
        data.push('<li style="color : '+options[k].active+'">'+options[k][k] +'</li>');
      }

      return data;
    },
    createTest() {
      this.createtest.batch = this.createtest.batch.map(function(data) {
        return data.id;
      });
      this.createtest.teacherId = this.createtest.teacherId;
      this.createtest.question = this.checkedQuestions.map(function(data) {
        return data.id;
      });

      PostRequest(this.BaseUrl + 'api/admin/create/test', this.createtest)
        .then(res => {
            if (res.status == 200) {
                this.$swal({
                  type: 'success',
                  title: 'Done !',
                  text: 'Test created successfully',
                  showConfirmButton: true
                }).then((result) => {
                  if (result) {
                    this.$router.push('/Dashboard/TestList');
                  }
                });
                this.$forceUpdate();
            }
        })
        .catch(error => {
            console.log(error);
        });
    },
    confirm() {
      let array = [];
      let list = this.rows.filter(function(data, index) {
        if (data.checked) {
          array.push(data);
          return array;
        }
      });

      this.checkedQuestions = list;
      this.closeModal();
    },
    updateCheck: function(rowValue) {
      this.rows.forEach(function(element) {
        if (element.id == rowValue.id) {
          element.checked = true;
        }
      }, this);
    },
    selectQuestions() {
      if(this.createtest.noOfQuestions){
        this.$router.push({
          name: 'SelectQuestionsView',
          params: {
            createtestParams: this.createtest,
            selectedQuestion: this.checkedQuestions
          }
        });
        // this.$refs.listOfQuesModal.show();
      } else {
          this.$swal({
            type: 'info',
            title: 'Please Wait !',
            text: 'Enter number of question you want in this test to proceed.'
          })        
      }
    },
    closeModal: function(events, args) {
      this.$refs.listOfQuesModal.hide();
    },
    customLabel(option) {
      return `${option.batchname}`
    },

    search() {
      let filterValue = {
        categoryId: this.createtest.categoryId,
        subjectId: this.createtest.subjectId,
        topicId: this.createtest.topicId
      };
      PostRequest(this.BaseUrl + 'api/admin/filterByQuestions', filterValue).then(res => {
        if (res.status == 200) {
          this.rows = [];
          res.body.message.forEach(function(element) {
            this.rows.push({
              id: element.id,
              scaleName: element.scale.scaleName,
              subjectName: element.subject.subjectName,
              question: element.question,
              topicName: element.topic.topicName,
              checked: false
            })
          }, this);
          this.$forceUpdate();
        }
      });
    },
    reset() {
      this.rows = [];
      this.createtest = {
        subjectId: null,
        categoryId: null,
        topicId: null
      };
      this.subjectOptions = [];
      this.bindSubjects();
      this.topicOptions = [{
        value: null,
        text: 'Select Topic'
      }];
      this.questionTypeOptions = [{
        value: null,
        text: 'Select Question Type'
      }, {
        value: 1,
        text: 'Single Selection'
      }, {
        value: 2,
        text: 'Multi Selection'
      }];
      this.init();
    },
    subjectChange() {
      var self = this;
      setTimeout(function() {
        let postData = {};
        postData.subjectId = self.createtest.subjectId;
        PostRequest(self.BaseUrl + 'api/admin/subject/assosicated/topic', postData).then(res => {
          self.topicOptions = [];
          self.topicOptions.push({
            value: null,
            text: 'Select Topic'
          })
          if (res.status) {
            let response = res.body.message;
            if (response) {
              response.forEach(function(element) {
                self.topicOptions.push({
                  value: element.id,
                  text: element.topicName
                })
              }, self);
            }
            self.createtest.topic = null;
          }
        });
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      // let sorts = this.getFinalSorts();
      // alert(JSON.stringify(sorts));
      alert(JSON.stringify(this.createtest));
      this.$router.go(this.$router.currentRoute);
    },

    addRow: function() {
      this.questionSortList.push({
        scale: '0',
        subject: '0',
        numberquestions: ''
      });
      this.toShowRemoveSort = true;
    },

    removeRow: function() {
      this.questionSortList.pop();
      let questionSortListLength = this.questionSortList.length;
      if (questionSortListLength == 1) {
        this.toShowRemoveSort = false;
      }
    },
    answerCheckboxClick: function(sender) {
      let controlList = document.getElementsByClassName('answerCheckboxClass');
      let checkedCounter = 0;
      for (let i = 0; i < controlList.length; i++) {
        if (controlList[i].checked) {
          checkedCounter++;
        }
        if (checkedCounter > 1) {
          alert('You cannot select multiple answers')
          event.currentTarget.checked = false;
          break;
        }
      }
    },
    getFinalSorts: function() {
      let finalSortObj = [];
      let scaleList = document.getElementsByClassName('sortScaleClass');
      let subjectList = document.getElementsByClassName('sortSubjectClass');
      let questionList = document.getElementsByClassName('sortQuestionsClass');

      for (let i = 0; i < scaleList.length; i++) {
        let sortObj = {};
        sortObj.Scale = scaleList[i].value;
        sortObj.Subject = subjectList[i].value;
        sortObj.NoOfQuestions = questionList[i].value;
        finalSortObj.push(sortObj);
      }

      return finalSortObj;
    },
  },
  created: function() {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.init();
  }
}