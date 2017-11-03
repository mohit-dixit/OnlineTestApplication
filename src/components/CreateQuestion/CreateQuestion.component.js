import Vue from 'vue'
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'
export default {
  name: 'create-question',
  components: {},
  props: [],
  data() {
    this.toShowRemoveAnswer = false;
    return {
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
      answers: [{
        answer: '',
        iscorrect: false
      }, ],
      createquestion: {
        points: null,
        scale: null,
        subject: null
      },
      addscale: {},
      addsubject: {},
      pointsOptions: [{
          value: null,
          text: '--Select Points--'
        },
        {
          value: '1',
          text: '2'
        },
        {
          value: '2',
          text: '3'
        },
        {
          value: '3',
          text: '4'
        },
        {
          value: '4',
          text: '5'
        }
      ],
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
          value: null,
          text: '--Select Subject--'
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
          value: null,
          text: '--Select Scale--'
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
      let answers = this.getFinalAnswers();
      alert(JSON.stringify(this.createquestion));

      this.$router.push('/')
    },

    addRow: function () {
      let firstAnswerEditorText;
      let editorControlList = document.getElementsByClassName('answerEditorClass');
      for (let i = 0; i < editorControlList.length; i++) {
        firstAnswerEditorText = editorControlList[i].textContent.trim();
        break;
      }
      this.answers.push({
        answer: firstAnswerEditorText,
        iscorrect: false
      });
      this.toShowRemoveAnswer = true;
    },

    removeRow: function () {
      this.answers.pop();
      let answersLength = this.answers.length;
      if (answersLength == 1) {
        this.toShowRemoveAnswer = false;
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
    getFinalAnswers: function () {
      let finalAnswerObj = [];
      let checkboxControlList = document.getElementsByClassName('answerCheckboxClass');
      let editorControlList = document.getElementsByClassName('answerEditorClass');
      for (let i = 0; i < checkboxControlList.length; i++) {
        debugger;
        let answerObj = {};
        answerObj.answerText = editorControlList[i].outerText;
        answerObj.isAnswer = false;
        if (checkboxControlList[i].checked) {
          answerObj.isAnswer = true;
        }
        finalAnswerObj.push(answerObj);
      }
      return finalAnswerObj;
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
  created: function () {
    this.bindSubjects();
    this.bindScale();
  }
}
