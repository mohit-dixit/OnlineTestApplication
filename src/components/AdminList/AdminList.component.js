import Vue from "vue";
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'
import * as config from '../../config/constants.js'
export default {
  name: 'admin-list',
  components: {},
  props: [],
  data() {
    this.BaseUrl = config.BASE_URL;
    this.adminList = [];
    this.selectedId = 0;
    return {
      columnsAdmins: [{
          label: 'Id',
          field: 'id',
          visible: false
        },
        {
          label: 'First Name',
          field: 'firstname',
          filterable: true
        },
        {
          label: 'Last Name',
          field: 'lastname',
          filterable: true
        },
        {
          label: 'Phone',
          field: 'phone',
          filterable: true
        },
        {
          label: 'Email/Username',
          field: 'email',
          filterable: true
        },
        {
          label: 'Action'
        }
      ]
    }
  },
  computed: {},
  mounted() {

  },
  methods: {
    bindAdmins: function () {
      GetRequest(this.BaseUrl + 'api/superAdmin/admin/list').then(res => {
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
          this.adminList = list;
          this.$forceUpdate();
        } else {
          this.adminList = [];
        }
      });
    },
    redirectToNewAdmin: function () {
      this.$router.push('/Dashboard/CreateAdmin');
    },
    editAdminClick: function (events, args) {
      this.$router.push({name: 'EditAdmin', params: {id:events.row.id }});
    },
    deleteAdminClick: function (events, args) {
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
        PostRequest(this.BaseUrl + 'api/superAdmin/delete/admin', postData).then(res => {
          if (res) {
            if (res.status == 200) {
              this.bindAdmins();
              this.$refs.modalDelete.close();
            }
          }
        });
      }
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.bindAdmins();
  }
}
