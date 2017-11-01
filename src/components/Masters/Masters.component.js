import Vue from "vue";

export default {
  name: 'masters',
  components: {},
  props: [],
  data() {
    this.showDivId = 0;
    this.adminList = [];
    return {
      gridOptions: null,
      rowData: []
    }
  },
  components: {
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    updateSource: function (source) {
      this.$http.get('https://newsapi.org/v1/sources?language=en')
        .then(response => {
          this.articles = response.data.sources;
        });
    },
    showtable: function (id) {
      this.showDivId = id;
      //get request
      this.adminList.push({
        name: 'Mohit Dixit',
        email: 'mohit@gmail.com',
        phone: '9968445395',
        associatedwith: 'asasasa'
      });
      //get request
      this.$forceUpdate();
    },
    redirectToNewAdmin: function () {
      this.$router.push('/Dashboard/CreateAdmin');
    },
    editAdminClick: function (events, args) {
      debugger;
      this.$router.push('/Dashboard/CreateAdmin', 1);
    },
    loadRowData: function() {
      this.$http.get('https://newsapi.org/v1/sources?language=en')
        .then((response) => {
          return response.data.sources
        })
        .then((json) => {
          this.rowData = json;
          this.$forceUpdate();
        });
    },
    createColDefs() {
      return [{
          headerName: "ID",
          field: "id",
          width: 225,
          suppressSizeToFit: true
        },
        {
          headerName: "Name",
          field: "name"
        },
        {
          headerName: "Description",
          field: "description"
        },
        {
          headerName: "URL",
          field: "url"
        }
      ];
    },
    onRowDataChanged() {
      Vue.nextTick(() => {
        this.gridOptions.api.sizeColumnsToFit();
      });

    }
  },
  created: function () {
    this.$http.get('https://newsapi.org/v1/sources?language=en')
      .then(response => {
        this.sources = response.data.sources;
      });

    this.gridOptions = {};
    this.gridOptions.columnDefs = this.createColDefs();
    this.loadRowData();
  }
}
