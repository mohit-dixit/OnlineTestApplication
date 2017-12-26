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
    return {
      uploads: {type : null},
      options: [{
        value: null,
        text: 'Select Type'
      },{
        value: 1,
        text: 'Teacher'
      }, {
        value: 2,
        text: 'Student'
      }, {
        value: 3,
        text: 'Scale'
      }, {
        value: 4,
        text: 'Subject'
      }, {
        value: 5,
        text: 'Batch'
      }, {
        value: 6,
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
      console.log(finalExcelData);
    }
  },
  created: function () {
    this.loginRole = Vue.lsobj.get('loginRole');
  }
}
