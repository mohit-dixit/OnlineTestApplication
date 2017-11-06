import Vue from 'vue'
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'
export default  {
  name: 'create-test',
  components: {},
  props: [],
  data() {
    this.toShowRemoveSort = false;
    return {
      questionSortList: [{
        scale: '0',
        subject: '0',
        numberquestions:''
      }, ],
      createtest:{},
      scaleOptions: [],
      subjectOptions: []
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    //Controls bindings
    bindSubjects: function () {
      GetRequest('static/subject.json').then(res => {
        this.subjectOptions.push({
          value: '0',
          text: 'All'
        })
        if (res) {
          res.forEach(function (element) {
            this.subjectOptions.push({
              value: element.value,
              text: element.text
            })
          }, this);
        }
      });
    },
    bindScale: function () {
      GetRequest('static/scale.json').then(res => {
        this.scaleOptions.push({
          value: '0',
          text: 'All'
        })
        if (res) {
          res.forEach(function (element) {
            this.scaleOptions.push({
              value: element.value,
              text: element.text
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
    addScale(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (!this.addscale.scalename) {
        alert('Please enter Scale');
      } else {
        this.submitScale()
      }
    },

    submitScale() {
      alert(this.addscale.scalename);
      this.addscale = {};
      this.$refs.modalScale.hide();
    },
    addSubject(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (!this.addsubject.subjectname) {
        alert('Please enter Subject');
      } else {
        this.submitSubject()
      }
    },

    submitSubject() {
      alert(this.addsubject.subjectname);
      this.addsubject = {};
      this.$refs.modalSubject.hide();
    }
  },
  created: function(){
    this.loginRole = Vue.lsobj.get('loginRole');
    this.bindSubjects();
    this.bindScale();
  }
}
