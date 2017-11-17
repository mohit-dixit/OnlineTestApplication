import Vue from "vue";
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'
import * as config from '../../config/constants.js'
export default  {
  name: 'subject-list',
  components: {},
  props: [],
  data () {
    this.BaseUrl = config.BASE_URL;
    this.subjectList = [];
    this.selectedId = 0;
    return {
      columnsSubjects: [{
        label: 'Id',
        field: 'id',
        visible: false
      },
      {
        label: 'Subject Name',
        field: 'name',
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
  mounted () {

  },
  methods: {
    bindSubjects: function () {
      GetRequest(this.BaseUrl + 'api/admin/subject/list').then(res => {
        if (res.status) {
          let response = res.result.message[0].user_roles;
          let list = [];
          response.forEach(function (element) {
            let userObject = element.user;
            list.push({
              id: userObject.id,
              firstname: userObject.firstname,
              lastname: userObject.lastname,
              phone: userObject.phone,
              email: userObject.username
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
      this.$router.push({name: 'EditSubject', params: {id:events.row.id }});
    },
    deleteSubjectClick: function (events, args) {
      this.selectedId = events.row.id;
      this.$refs.modalDelete.open();
    },
    closeModal: function (events, args) {
      this.$refs.modalDelete.close();
    },
    deleteConfirmation: function () {
      if (this.selectedId) {
        let postData = {};
        postData.id = this.selectedId;
        PostRequest(this.BaseUrl + 'api/admin/delete/subject', postData).then(res => {
          if (res) {
            if (res.status == 200) {
              this.bindSubjects();
              this.$refs.modalDelete.close();
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
