import Vue from 'vue'
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'

export default  {
  name: 'assign-test',
  components: {},
  props: [],
  data() {
    return {
      date: new Date(),
      config: {
        format: 'DD/MM/YYYY',
        useCurrent: false,
      },
      assigntestform: {
        selecttest: null,
        selectstudent: null
      },
      testOptions: [],
      studentOptions: [],
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    //Controls bindings
    getTestList: function () {
      GetRequest('static/test.json').then(res => {
        this.testOptions.push({ value: null,text: 'Select Test'})
        if (res) {
          res.forEach(function (element) {
            this.testOptions.push({
              value: element.id,
              text: element.name
            })
          }, this);
        }
      });
    },

    getStudentList: function () {
      GetRequest('static/student.json').then(res => {
        this.studentOptions.push({ value: null,text: 'Select Student'})
        if (res) {
          res.forEach(function (element) {
            this.studentOptions.push({
              value: element.id,
              text: element.name
            })
          }, this);
        }
      });
    },

    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.assigntestform));
      this.assigntestform = {};
      //this.$router.push('/Dashboard')
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.getTestList();
    this.getStudentList();
  }
}
