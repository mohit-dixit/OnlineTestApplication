import Vue from "vue";
import AddAdmin from '../CreateAdmin/index.vue'
import AddInstitute from '../CreateInstitute/index.vue'
import {GetRequest, PostRequest} from '../../utils/globalservice'

export default {
  name: 'masters',
  props: [],
  data() {
    this.showDivId = 0;
    this.adminList = [];
    this.instituteList = [];
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
    }
  },
  components: {
    'add-admin': AddAdmin,
    'add-institute': AddInstitute
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    //Controls bindings
    getInstituteList: function(){
      GetRequest('static/institute.json').then(res => this.instituteList = res);
    },

    showtable: function (id) {
      this.showDivId = id;
      this.$forceUpdate();
    },
    redirectToNewAdmin: function () {
      this.$router.push('/Dashboard/CreateAdmin');
    },
    editAdminClick: function (events, args) {
      debugger;
      this.$router.push('/Dashboard/CreateAdmin', 1);
    }
  },
  created: function () {
    this.getInstituteList();
    this.adminList.push({
      name: 'Mohit Dixit',
      email: 'mohit@gmail.com',
      phone: '9968445395',
      associatedwith: 'asasasa'
    });
  }
}
