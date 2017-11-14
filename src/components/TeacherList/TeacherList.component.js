import Vue from "vue";
import {GetRequest, PostRequest} from '../../utils/globalservice'

export default  {
  name: 'teacher-list',
  components: {},
  props: [],
  data () {
    this.teacherList=[];
    return {
      columnsTeachers: [
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
    this.teacherList.push({
      firstname: 'Ankit',
      lastname: 'Ahuja',
      email: 'ankitahuja@gmail.com',
      phone: '23423424323'
    });
  }
}
