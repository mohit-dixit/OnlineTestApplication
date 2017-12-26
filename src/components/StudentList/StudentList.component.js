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
    this.filters={};
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
          label: 'Name',
          field: 'firstname',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },
        {
          label: 'Batch',
          field: 'batch',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },
        {
          label: 'Phone',
          field: 'phone',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },
        {
          label: 'Email',
          field: 'email',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },{
          label: 'Status',
          field: 'status',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },
        {
          label: 'Action',
          thClass:'text-center',
          tdClass:'text-center'
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
              batch: userObject.student_batches[0].batch.batchName,
              phone: userObject.phone,
              email: userObject.username,
              status: element.status ? 'Active' : 'Inactive',
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
    },
    activeInactiveChange: function(sender, rowVals){
      let row = rowVals.formattedRow;
      let postData = {};
      postData.id = row.id;
      postData.status = sender.currentTarget.checked ? 1 : 0;
      postData.type = config.CRUD_CODES.USER;
      PostRequest(this.BaseUrl + 'api/admin/status/update', postData).then(res => {
        if (res) {
          if (res.status == 200) {
            //this.bindAdmins();
          }
        }
      });
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.bindStudents();
  }
}
