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
        text: '--Select Type--'
      },{
        value: 1,
        text: 'Teacher'
      }, {
        value: 2,
        text: 'Student'
      }]
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    handleSelectedFile(convertedData) {
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
