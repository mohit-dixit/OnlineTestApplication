import Vue from "vue";
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'
import * as config from '../../config/constants.js'
export default {
  name: 'uploads',
  components: {},
  props: [],
  data() {
    this.finalDataToUpload = null;
    this.BaseUrl = config.BASE_URL;
    return {
      uploads: {typeId : null},
      options: [{
        value: null,
        text: 'Select Type'
      },{
        value: 10,
        text: 'Teacher'
      }, {
        value: 9,
        text: 'Student'
      }, {
        value: 4,
        text: 'Scale'
      }, {
        value: 5,
        text: 'Subject'
      }, {
        value: 1,
        text: 'Batch'
      }, {
        value: 8,
        text: 'Topic'
      }]
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    onSubmit: function(evt){
      evt.preventDefault();
      this.$validator.validateAll().then((result) => {
          if(this.finalDataToUpload){
            this.BaseUrl = 'http://127.0.0.1:3013/';
            this.uploads.uploadData = this.finalDataToUpload;
            PostRequest(this.BaseUrl + 'api/admin/upload'  , this.uploads).then(res => {
              if (res) {

              }
            });
          }
      });
    },
    handleSelectedFile(convertedData) {
          let fileData = document.getElementById("upload-input").files[0];
          if(fileData){
            let fileName = fileData.name;
            let arrFileName = fileName.split('.');
            let arrFileNameLength = arrFileName.length;
            let fileExtension = arrFileName[arrFileNameLength - 1];
            if(['xlsx','xls'].indexOf(fileExtension) < 0){
              alert('Please select the file of .xls or .xlsx format');
              return;
            }
          }
          let excelData = convertedData.body;
          let excelHeader = convertedData.header;
          let finalExcelData = [];

          for(let i = 0; i < excelData.length; i++){
              finalExcelData.push(JSON.stringify(excelData[i]));
          }

          this.finalDataToUpload = finalExcelData;
      }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
  }
}
