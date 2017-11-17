import Vue from "vue";
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'
import * as config from '../../config/constants.js'
export default  {
  name: 'scale-list',
  components: {},
  props: [],
  data () {
    this.BaseUrl = config.BASE_URL;
    this.scaleList = [];
    this.selectedId = 0;
    return {
      columnsScales: [{
        label: 'Id',
        field: 'id',
        visible: false
      },
      {
        label: 'Scale',
        field: 'name',
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
  mounted () {

  },
  methods: {
    bindScales: function () {
      GetRequest(this.BaseUrl + 'api/admin/scale/list').then(res => {
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
          this.scaleList = list;
          this.$forceUpdate();
        } else {
          this.scaleList = [];
        }
      });
    },
    redirectToNewScale: function () {
      this.$router.push('/Dashboard/CreateScale');
    },
    editScaleClick: function (events, args) {
      this.$router.push({name: 'EditScale', params: {id:events.row.id }});
    },
    deleteScaleClick: function (events, args) {
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
        PostRequest(this.BaseUrl + 'api/admin/delete/scale', postData).then(res => {
          if (res) {
            if (res.status == 200) {
              this.bindScales();
              this.$refs.modalDelete.close();
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
