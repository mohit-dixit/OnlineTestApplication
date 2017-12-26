import Vue from "vue";
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'
import * as config from '../../config/constants.js'
export default {
  name: 'scale-list',
  components: {},
  props: [],
  data() {
    this.BaseUrl = config.BASE_URL;
    this.scaleList = [];
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
      columnsScales: [{
          label: 'Id',
          field: 'id',
          hidden : true
        },
        {
          label: 'Scale',
          field: 'scalename',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },{
          label: 'Points',
          field: 'points',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },{
          label: 'Status',
          field: 'status',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },{
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
    bindScales: function () {
      let postData = {};
      postData.status = null;
      PostRequest(this.BaseUrl + 'api/admin/scale/list', postData).then(res => {
        if (res.status) {
          if(res.body){
            let response = res.body.message;
            let list = [];
            response.forEach(function (element) {
              list.push({
                id: element.id,
                scalename: element.scaleName,
                points: element.scalePoint,
                status: element.status ? 'Active' : 'Inactive',
              })
            }, this);
            this.scaleList = list;
            this.$forceUpdate();
          } else {
            this.scaleList = [];
          }
        }
      });
    },
    redirectToNewScale: function () {
      this.$router.push('/Dashboard/CreateScale');
    },
    editScaleClick: function (events, args) {
      this.$router.push({
        name: 'EditScale',
        params: {
          id: events.row.id,
          name:events.row.scalename,
          points: events.row.points,
          status: events.row.status
        }
      });
    },
    deleteScaleClick: function (events, args) {
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
        PostRequest(this.BaseUrl + 'api/admin/delete/scale', postData).then(res => {
          if (res) {
            if (res.status == 200) {
              this.bindScales();
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
      postData.type = config.CRUD_CODES.SCALE;
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
    this.bindScales();
  }
}
