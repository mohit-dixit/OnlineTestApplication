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
          filterable: true
        },
        {
          label: 'Subject',
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
    bindTopics: function () {
      GetRequest(this.BaseUrl + 'api/admin/topic/list').then(res => {
        if (res.status) {
          let response = res.result.message;
          let list = [];
          response.forEach(function (element) {
            list.push({
              id: element.id,
              topicname: element.topicName,
              subjectname: element.subject.subjectName,
              subjectId: element.subject.id,
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
          subjectId: events.row.subjectId
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
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.bindTopics();
  }
}