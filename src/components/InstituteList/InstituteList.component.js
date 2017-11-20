import Vue from "vue";
import {GetRequest, PostRequest} from '../../utils/globalservice'
import * as config from '../../config/constants.js'
export default  {
  name: 'institute-list',
  components: {},
  props: [],
  data () {
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
          filterable: true,
        },
        {
          label: 'Name',
          field: 'name',
          filterable: true,
        },
        {
          label: 'Email',
          field: 'emailID',
          filterable: true,
        },
        {
          label: 'Phone',
          field: 'phone',
          filterable: true,
        },
        {
          label: 'Address',
          field: 'address'
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
    bindInstitutes: function () {
      GetRequest(this.BaseUrl + 'api/superAdmin/institute/list').then(res => {
        if (res.status) {
          let response = res.result.message;
          let list = [];
            response.forEach(function (element) {
              list.push({
                id: element.id,
                name: element.name,
                emailID: element.emailID,
                phone: element.phone,
                address: element.address
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
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
    this.bindInstitutes();
  }
}
