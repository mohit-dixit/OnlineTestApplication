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
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },
        {
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
    bindBatches: function () {
      let postData = {};
      postData.status = null;
      PostRequest(this.BaseUrl + 'api/admin/batch/list', postData).then(res => {
        if (res.body) {
          let response = res.body.message;
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
    },
    activeInactiveChange: function(sender, rowVals){
      let row = rowVals.formattedRow;
      let postData = {};
      postData.id = row.id;
      postData.status = sender.currentTarget.checked ? 1 : 0;
      postData.type = config.CRUD_CODES.BATCH;
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
    this.bindBatches();
  }
}
