import Vue from "vue";
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'
import * as config from '../../config/constants.js'
export default  {
  name: 'batch-list',
  components: {},
  props: [],
  data() {
    this.BaseUrl = config.BASE_URL;
    this.batchList = [];
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
      columnsBatchs: [{
          label: 'Id',
          field: 'id',
          hidden : true
        },
        {
          label: 'Batch',
          field: 'batchname',
          filterable: true
        },
        {
          label: 'Status',
          field: 'status',
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
    bindBatches: function () {
      GetRequest(this.BaseUrl + 'api/admin/batch/list').then(res => {
        if (res.status) {
          let response = res.result.message;
          let list = [];
          response.forEach(function (element) {
            list.push({
              id: element.id,
              batchname: element.batchName,
              status: element.status ? 'Active' : 'Inactive',
              points: element.batchPoint,
            })
          }, this);
          this.batchList = list;
          this.$forceUpdate();
        } else {
          this.batchList = [];
        }
      });
    },
    redirectToNewBatch: function () {
      this.$router.push('/Dashboard/CreateBatch');
    },
    editBatchClick: function (events, args) {
      this.$router.push({
        name: 'EditBatch',
        params: {
          id: events.row.id,
          name: events.row.batchname,
          status: events.row.status
        }
      });
    },
    deleteBatchClick: function (events, args) {
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
        PostRequest(this.BaseUrl + 'api/admin/delete/batch', postData).then(res => {
          if (res) {
            if (res.status == 200) {
              this.bindBatches();
              this.$refs.deleteModal.hide();
            }
          }
        });
      }
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.bindBatches();
  }
}
