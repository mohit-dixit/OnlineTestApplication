import Vue from "vue";
import {GetRequest, PostRequest} from '../../utils/globalservice'
export default  {
  name: 'student-list',
  components: {},
  props: [],
  data () {
    this.studentList=[];
    return {
      columnsStudents: [
        {
          label: 'First Name',
          field: 'firstname',
          filterable: true,
        },
        {
          label: 'Last Name',
          field: 'lastname',
          filterable: true,
        },
        {
          label: 'Email',
          field: 'email',
          filterable: true,
        },
        {
          label: 'Phone',
          field: 'phone'
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

  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.studentList.push({
      firstname: 'Mohit',
      lastname: 'Dixit',
      email: 'mohitdixit@gmail.com',
      phone: '7567567564'
    });
  }
}
