import Vue from "vue";
import AddAdmin from '../CreateAdmin/index.vue'
import AddInstitute from '../CreateInstitute/index.vue'
import {GetRequest, PostRequest} from '../../utils/globalservice'
export default {
  name: 'masters',
  props: [],
  data() {
    this.hideForNow = false;
    this.showDivId = 0;
    this.adminList = [];
    this.instituteList = [];
    this.teacherList=[];
    this.studentList=[];
    return {
      columnsAdmins: [
        {
          label: 'Name',
          field: 'name',
          filterable: true,
        },
        {
          label: 'Email',
          field: 'email',
          filterable: true,
        },
        {
          label: 'Phone',
          field: 'phone',
          filterable: true,
        },
        {
          label: 'Associated With',
          field: 'associatedwith'
        },
        {
          label: 'Action'
        }
      ],
      columnsInstitutes: [
        {
          label: 'Name',
          field: 'name',
          filterable: true,
        },
        {
          label: 'Email',
          field: 'email',
          filterable: true,
        },
        {
          label: 'Phone',
          field: 'phone',
          filterable: true,
        },
        {
          label: 'Address',
          field: 'address'
        },
        {
          label: 'Action'
        }
      ],
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
      ],
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
      ],
      variants: [
       'primary','secondary','success','warning','danger','info','light','dark'
      ],
      headerBgVariant: 'dark',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'dark',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark',
    }
  },
  components: {
    'add-admin': AddAdmin,
    'add-institute': AddInstitute
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    //Controls bindings
    getInstituteList: function(){
      GetRequest('static/institute.json').then(res => this.instituteList = res);
    },
    showtable: function (id) {
      this.showDivId = id;
      this.$forceUpdate();
    },
    redirectToNewAdmin: function () {
      this.$router.push('/Dashboard/CreateAdmin');
    },
    editAdminClick: function (events, args) {
      this.$router.push('/Dashboard/CreateAdmin', 1);
    },
    editInstituteClick: function (events, args) {
      this.$router.push('/Dashboard/CreateAdmin', 1);
    },
    deleteAdminClick: function (events, args) {
      this.$router.push('/Dashboard/CreateAdmin', 1);
    },
    deleteInstituteClick: function (events, args) {
      this.$router.push('/Dashboard/CreateAdmin', 1);
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.getInstituteList();
    this.adminList.push({
      name: 'Admin1 Last2',
      email: 'superadmin@gmail.com',
      phone: '9968445395',
      associatedwith: 'KN Modi College'
    });
    this.teacherList.push({
      firstname: 'Ankit',
      lastname: 'Ahuja',
      email: 'ankitahuja@gmail.com',
      phone: '23423424323'
    });
    this.studentList.push({
      firstname: 'Mohit',
      lastname: 'Dixit',
      email: 'mohitdixit@gmail.com',
      phone: '7567567564'
    });
  }
}
