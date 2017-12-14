import Vue from "vue";
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'
import * as config from '../../config/constants.js'
export default {
  name: 'subject-list',
  components: {},
  props: [],
  data() {
    this.BaseUrl = config.BASE_URL;
    this.subjectList = [];
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
      columnsSubjects: [
        {
          label: 'Id',
          field: 'id',
          hidden : true
        },
        {
          label: 'Subject Name',
          field: 'subjectname',
          filterable: true
        },
        {
          label: 'Action'
        }
      ]
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    bindSubjects: function () {
      GetRequest(this.BaseUrl + 'api/admin/subject/list').then(res => {
        if (res.status) {
          let response = res.result.message;
          let list = [];
          response.forEach(function (element) {
            list.push({
              id: element.id,
              subjectname: element.subjectName
            })
          }, this);
          this.subjectList = list;
          this.$forceUpdate();
        } else {
          this.subjectList = [];
        }
      });
    },
    redirectToNewSubject: function () {
      this.$router.push('/Dashboard/CreateSubject');
    },
    editSubjectClick: function (events, args) {
      this.$router.push({
        name: 'EditSubject',
        params: {
          id: events.row.id,
          name: events.row.subjectname
        }
      });
    },
    deleteSubjectClick: function (events, args) {
      this.selectedId = events.row.id;
      // this.$refs.deleteModal.show();
      this.$swal({
        title: 'Wait !',
        text: "Are you sure you want to delete ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      }).then((result) => {
        // debugger;
        if (result) {
          // this.$router.push('/Dashboard/Masters/SubjectList');
          this.deleteConfirmation();
        }
      })
    },
    closeModal: function (events, args) {
      this.$refs.deleteModal.hide();
    },
    deleteConfirmation: function () {
      if (this.selectedId) {
        let postData = {};
        postData.id = this.selectedId;
        PostRequest(this.BaseUrl + 'api/admin/delete/subject', postData).then(res => {
          if (res) {
            if (res.status == 200) {
              this.bindSubjects();
              this.$refs.deleteModal.hide();
            }
          }
        });
      }
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.bindSubjects();
  }
}

