import Vue from "vue";
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'
import * as config from '../../config/constants.js'
export default {
  name: 'student-list',
  components: {},
  props: [],
  data() {
    this.BaseUrl = config.BASE_URL;
    this.studentList = [];
    this.selectedId = 0;
    return {
      variants: [
        'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'
      ],
      headerBgVariant: 'dark',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'dark',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark',
      columnsStudents: [{
          label: 'Id',
          field: 'id',
          hidden : true
        },
        {
          label: 'First Name',
          field: 'firstname',
          filterable: true
        },
        {
          label: 'Last Name',
          field: 'lastname',
          filterable: true
        },
        {
          label: 'Phone',
          field: 'phone',
          filterable: true
        },
        {
          label: 'Email/Username',
          field: 'email',
          filterable: true
        },
        {
          label: 'Action'
        }
      ]
    }
  },
  computed: {},
  mounted() {

  },
  methods: {
    bindStudents: function () {
      GetRequest(this.BaseUrl + 'api/admin/student/list').then(res => {
        if (res.status) {
          let response = res.result.message;
          let list = [];
          response.forEach(function (element) {
            let userObject = element;
            list.push({
              id: userObject.id,
              firstname: userObject.firstname,
              lastname: userObject.lastname,
              phone: userObject.phone,
              email: userObject.username
            })
          }, this);
          this.studentList = list;
          this.$forceUpdate();
        } else {
          this.studentList = [];
        }
      });
    },
    redirectToNewStudent: function () {
      this.$router.push('/Dashboard/CreateStudent');
    },
    editStudentClick: function (events, args) {
      this.$router.push({
        name: 'EditStudent',
        params: {
          id: events.row.id
        }
      });
    },
    deleteStudentClick: function (events, args) {
      this.selectedId = events.row.id;
      this.$refs.deleteModal.show();
    },
    closeModal: function (events, args) {
      this.$refs.deleteModal.hide();
    },
    deleteConfirmation: function () {
      if (this.selectedId) {
        let postData = {};
        postData.id = this.selectedId;
        PostRequest(this.BaseUrl + 'api/admin/delete/user', postData).then(res => {
          if (res) {
            if (res.status == 200) {
              this.bindStudents();
              this.$refs.deleteModal.hide();
            }
          }
        });
      }
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.bindStudents();
  }
}
