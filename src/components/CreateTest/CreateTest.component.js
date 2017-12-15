import SuccessNotification from '../SuccessNotification'
import Multiselect from 'vue-multiselect'
import VueLocalStorage from 'vue-localstorage'
import * as config from '../../config/constants.js'
import Vue from 'vue'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'

const items = [
  { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
  { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
  { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
  { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
]
export default {
  name: 'create-test',
  components: { Multiselect },
  props: [],
  data() {
    this.toShowRemoveSort = false;
    this.BaseUrl = config.BASE_URL;
    this.showMOdal = false;
    return {
      date: new Date(),
      config: {
        format: 'DD/MM/YYYY',
        useCurrent: false,
      },
      questionSortList: [{
        scale: '0',
        subject: '0',
        numberquestions: ''
      }, ],
      createtest: {
        negativemarking: 0
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
      rows: []
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {

    confirm() {
        let array = [];
        let list = this.rows.filter(function(data, index) {
          if (data.checked) {
            array.push(data);
            return array;
          }
          // else {
          //   array.splice(index, 1);
          // }
        });

        debugger;
      this.checkedQuestions = list;

      // let val = this.rows.filter(function(row) {
      //   let filterValue;
      //   if (array.length == 0) {
      //     return 0;
      //   } else {
      //     array.filter(function(value) {
      //       if (value.id == row.id) {
      //         filterValue = value;
      //       } else {
      //         filterValue = 0;
      //       }
      //       return filterValue;
      //     });
      //   }
      //   return filterValue;
      // });
      // debugger;
      // if (val.length == 0) {
      //   let list = this.rows.filter(function(data, index) {
      //     if (data.checked) {
      //       array.push(data);
      //     }
      //     // else {
      //     //   array.splice(index, 1);
      //     // }
      //   });
      // } else {

      //   for (var i = 0; i < array.length; i++) {
      //     for (var j = 0; j < val.length; j++) {
      //       if (array[i].id === val[j].id) {
      //         array.splice(i, 1);
      //        array.push(array[i]);
      //       }else{
      //           debugger;
      //       }
      //     }
      //   }
      // }

      this.closeModal();
      //this.init();
    },
    updateCheck: function(rowValue) {
      this.rows.forEach(function(element) {
        if (element.id == rowValue.id) {
          element.checked = true;
        }
      }, this);
    },
    openQuesModal() {
      console.log(this.rows);
      this.$refs.listOfQuesModal.show();
    },
    closeModal: function(events, args) {
      this.$refs.listOfQuesModal.hide();
    },
    customLabel(option) {
      return `${option.batchname}`
    },
    init: function() {
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
          debugger;
        }
      });

    },

    onSubmit(evt) {
      evt.preventDefault();
      let sorts = this.getFinalSorts();
      alert(JSON.stringify(sorts));
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
    // addScale(evt) {
    //   // Prevent modal from closing
    //   evt.preventDefault();
    //   if (!this.addscale.scalename) {
    //     alert('Please enter Scale');
    //   } else {
    //     this.submitScale()
    //   }
    // },
    // submitScale() {
    //   alert(this.addscale.scalename);
    //   this.addscale = {};
    //   this.$refs.modalScale.hide();
    // },
    // addSubject(evt) {
    //   // Prevent modal from closing
    //   evt.preventDefault();
    //   if (!this.addsubject.subjectname) {
    //     alert('Please enter Subject');
    //   } else {
    //     this.submitSubject()
    //   }
    // },
    // submitSubject() {
    //   alert(this.addsubject.subjectname);
    //   this.addsubject = {};
    //   this.$refs.modalSubject.hide();
    // }
  },
  created: function() {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.init();
  }
}
