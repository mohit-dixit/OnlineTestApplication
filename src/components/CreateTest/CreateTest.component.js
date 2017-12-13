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
export default  {
  name: 'create-test',
  components: { Multiselect },
  props: [],
  data() {
    this.toShowRemoveSort = false;
    this.BaseUrl = config.BASE_URL;
    return {
      date: new Date(),
      config: {
        format: 'DD/MM/YYYY',
        useCurrent: false,
      },
      questionSortList: [{
        scale: '0',
        subject: '0',
        numberquestions:''
      }, ],
      createtest:{
        negativemarking:0
      },
      batchOptions: [],
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    customLabel(option) {
      return `${option.batchname}`
    },
    bindBatches: function() {
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
    },

    onSubmit(evt) {
      evt.preventDefault();
      let sorts = this.getFinalSorts();
      alert(JSON.stringify(sorts));
      alert(JSON.stringify(this.createtest));
      this.$router.go(this.$router.currentRoute);
    },

    addRow: function () {
      this.questionSortList.push({
        scale: '0',
        subject: '0',
        numberquestions:''
      });
      this.toShowRemoveSort = true;
    },

    removeRow: function () {
      this.questionSortList.pop();
      let questionSortListLength = this.questionSortList.length;
      if (questionSortListLength == 1) {
        this.toShowRemoveSort = false;
      }
    },
    answerCheckboxClick: function (sender) {
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
    getFinalSorts: function () {
      let finalSortObj = [];
      let scaleList = document.getElementsByClassName('sortScaleClass');
      let subjectList = document.getElementsByClassName('sortSubjectClass');
      let questionList = document.getElementsByClassName('sortQuestionsClass');

      for (let i = 0; i < scaleList.length; i++) {
        debugger;
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
  created: function(){
    this.loginRole = Vue.lsobj.get('loginRole');
    this.bindBatches();
  }
}
