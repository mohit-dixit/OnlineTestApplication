import Vue from 'vue'
export default {
  name: 'create-question',
  components: {},
  props: [],
  data() {
    return {
      answers: [{
        answer: '',
        iscorrect: false
      }, ],
      createquestion: {
        points: null,
        category: null,
        subcategory: null
      },
      pointsOptions: [{
          value: null,
          text: '--Select Points--'
        },
        {
          value: '1',
          text: 'Two'
        },
        {
          value: '2',
          text: 'Three'
        },
        {
          value: '3',
          text: 'Four'
        },
        {
          value: '4',
          text: 'Five'
        }
      ],
      categoryOptions: [{
          value: null,
          text: '--Select Category--'
        },
        {
          value: '1',
          text: 'Easy'
        },
        {
          value: '2',
          text: 'Medium'
        },
        {
          value: '3',
          text: 'Hard'
        }
      ],
      subcategoryOptions: [{
          value: null,
          text: '--Select Sub Category--'
        },
        {
          value: '1',
          text: 'English'
        },
        {
          value: '2',
          text: 'Maths'
        },
        {
          value: '3',
          text: 'Science'
        }
      ]
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let answers = this.getFinalAnswers();
      alert(JSON.stringify(this.createquestion));

      this.$router.push('/')
    },
    addRow: function () {
      this.answers.push({
        answer: '',
        iscorrect: false
      });
    },
    removeRow: function (index) {
      this.rows.splice(index, 1);
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
    }
  }
}
