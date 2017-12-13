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
          filterable: true
        },
        {
          label: 'Points',
          field: 'points',
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
    bindScales: function () {
      GetRequest(this.BaseUrl + 'api/admin/scale/list').then(res => {
        if (res.status) {
          if(res.result){
            let response = res.result.message;
            let list = [];
            response.forEach(function (element) {
              list.push({
                id: element.id,
                scalename: element.scaleName,
                points: element.scalePoint,
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
          points: events.row.points
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
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.bindScales();
  }
}
