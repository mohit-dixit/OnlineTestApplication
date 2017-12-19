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
    this.loader = false;
    return {
      variants: [
        'primary','secondary','success','warning','danger','info','light','dark'
       ],
       headerBgVariant: 'dark',
       headerTextVariant: 'light',
       bodyBgVariant: 'light',
       bodyTextVariant: 'dark',
       footerBgVariant: 'warning',
       footerTextVariant: 'dark',

      columnsAdmins: [{
          label: 'Id',
          field: 'id',
          hidden : true
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
          label: 'Associated Institute',
          field: 'associatedwith',
          filterable: true
        },
        {
          label: 'Status',
          field: 'isactive',
          filterable: true
        }
      ]
    }
  },
  computed: {},
  mounted() {

  },
  methods: {
    bindAdmins: function () {
      this.loader = true;
      GetRequest(this.BaseUrl + 'api/superAdmin/admin/list')
      .then(res => {
        if (res.status) {
          this.loader = false;
          let response = res.result.message[0].user_roles;
          let list = [];
          response.forEach(function (element) {
            let userObject = element.user;
            if(userObject && userObject.user_institutes.length > 0){
              list.push({
                id: userObject.id,
                firstname: userObject.firstname,
                lastname: userObject.lastname,
                phone: userObject.phone,
                email: userObject.username,
                associatedwith: userObject.user_institutes[0].institute.name,
                isactive: (userObject.status < 2) ? 'Active' : 'Inactive',
              })
            }
          }, this);
          this.adminList = list;
          this.$forceUpdate();
        } else {
          this.loader = false;
          this.adminList = [];
        }
      })
      .catch(error => {
        this.loader = false;
        console.log(error, "Error while Admin List")
      })
    },
    redirectToNewAdmin: function () {
      this.$router.push('/Dashboard/CreateAdmin');
    },
    editAdminClick: function (events, args) {
      this.$router.push({name: 'EditAdmin', params: {id:events.row.id }});
    },
    deleteAdminClick: function (events, args) {
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
        PostRequest(this.BaseUrl + 'api/superAdmin/delete/admin', postData).then(res => {
          if (res) {
            if (res.status == 200) {
              this.bindAdmins();
              this.$refs.deleteModal.hide();
            }
          }
        });
      }
    },
    activeInactiveChange: function(sender, rowVals){
      alert(sender.currentTarget.checked);
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    if(this.loginRole === '2') {
      this.columnsAdmins.push({label: 'Action'});
    }
    this.bindAdmins();
  }
}
