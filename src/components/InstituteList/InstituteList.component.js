import Vue from "vue";
import {GetRequest, PostRequest} from '../../utils/globalservice'
import * as config from '../../config/constants.js'
export default  {
  name: 'institute-list',
  components: {},
  props: [],
  data () {
    this.filters={};
    this.BaseUrl = config.BASE_URL;
    this.instituteList = [];
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
      columnsInstitutes: [
        {
        label: 'Id',
        field: 'id',
        hidden : true
        },
        {
          label: 'Name',
          field: 'name',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },
        {
          label: 'Email',
          field: 'emailID',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },
        {
          label: 'Phone',
          field: 'phone',
          filterable: true,
          thClass:'text-center',
          tdClass:'text-center'
        },
        {
          label: 'Address',
          field: 'address',
          thClass:'text-center',
          tdClass:'text-center'
        },
        {
          label: 'Status',
          field: 'status',
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
  mounted () {

  },
  methods: {
    bindInstitutes: function () {
      let postData = {};
      postData.status = null;
      PostRequest(this.BaseUrl + 'api/superAdmin/institute/list', postData).then(res => {
        if (res.status) {
          let response = res.body.message;
          let list = [];
            response.forEach(function (element) {
              list.push({
                id: element.id || '-',
                name: element.name || '-',
                emailID: element.emailID || '-',
                phone: element.phone || '-',
                address: element.address || '-',
                status: element.status == '1' ? 'Active' : 'Inactive'
              })
            }, this);
            this.instituteList = list;
            this.$forceUpdate();
        }
        else{
          this.instituteList = [];
        }
      });
    },
    editInstituteClick: function (events, args) {
      this.$router.push({name: 'EditInstitute', params: {id:events.row.id }});
    },
    deleteInstituteClick: function (events, args) {
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
        PostRequest(this.BaseUrl + 'api/superAdmin/delete/institute', postData).then(res => {
          if (res) {
            if (res.status == 200) {
              this.bindInstitutes();
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
      postData.type = config.CRUD_CODES.INSTITUTE;
      PostRequest(this.BaseUrl + 'api/admin/status/update', postData).then(res => {
        if (res) {
          if (res.status == 200) {
            //this.bindInstitutes();
          }
        }
      });
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.bindInstitutes();
  }
}
