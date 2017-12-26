import Vue from "vue";
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'
import * as config from '../../config/constants.js'
export default  {
  name: 'topic-list',
  components: {},
  props: [],
  data() {
    this.BaseUrl = config.BASE_URL;
    this.topicList = [];
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
      columnsTopics: [{
          label: 'Id',
          field: 'id',
          hidden : true
        },
        {
          label: 'Subject Id',
          field: 'subjectId',
          filterable: true,
          hidden : true
        },
        {
          label: 'Topic',
          field: 'topicname',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },
        {
          label: 'Subject',
          field: 'subjectname',
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
  computed: {

  },
  mounted() {

  },
  methods: {
    bindTopics: function () {
      let postData = {};
      postData.status = null;
      PostRequest(this.BaseUrl + 'api/admin/topic/list', postData).then(res => {
        if (res.body) {
          let response = res.body.message;
          let list = [];
          response.forEach(function (element) {
            list.push({
              id: element.id,
              topicname: element.topicName,
              subjectname: element.subject.subjectName,
              subjectId: element.subject.id,
              status: element.status ? 'Active' : 'Inactive',
            })
          }, this);
          this.topicList = list;
          this.$forceUpdate();
        } else {
          this.topicList = [];
        }
      });
    },
    redirectToNewTopic: function () {
      this.$router.push('/Dashboard/CreateTopic');
    },
    editTopicClick: function (events, args) {
      this.$router.push({
        name: 'EditTopic',
        params: {
          id: events.row.id,
          name: events.row.topicname,
          subjectId: events.row.subjectId,
          status: events.row.status
        }
      });
    },
    deleteTopicClick: function (events, args) {
      this.selectedId = events.row.id;
      this.$refs.deleteModal.show();
    },
    closeModal: function (events, args) {
      this.$refs.deleteModal.hide();
    },
    deleteConfirmation: function () {
      if (this.selectedId) {
        let postData = {};
        postData.topic_id = this.selectedId;
        PostRequest(this.BaseUrl + 'api/admin/delete/topic', postData).then(res => {
          if (res) {
            if (res.status == 200) {
              this.bindTopics();
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
      postData.type = config.CRUD_CODES.TOPIC;
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
    this.bindTopics();
  }
}
