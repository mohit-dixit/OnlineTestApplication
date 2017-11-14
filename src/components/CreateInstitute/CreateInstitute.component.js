import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import * as config from '../../config/constants.js'
import {
  GetRequest,
  PostRequest,
  NumberKeyValidation
} from '../../utils/globalservice'
export default  {
  name: 'create-institute',
  components: {},
  props: [],
  data () {
    this.responseMessage = null;
    this.errorMessage = null;
    this.BaseUrl = config.BASE_URL;
    this.notifySuccess = false;
    this.notifyError = false;
    return {
      createinstituteform:{
      }
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      PostRequest(this.BaseUrl + 'api/superAdmin/create/institute', this.createinstituteform).then(res => {
        if (res) {
          if(res.status == 200)
          {
            this.createinstituteform = {};
            this.responseMessage = 'Institute created successfully';
            this.notifySuccess = true;
            this.notifyError = false;
          }
          else
          {
            this.errorMessage = res.statusText;
            this.notifySuccess = false;
            this.notifyError = true;
          }
        }
      });
    }
  }
}
