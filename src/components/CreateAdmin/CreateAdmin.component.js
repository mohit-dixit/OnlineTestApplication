import Vue from 'vue'
import {
  GetRequest,
  PostRequest
} from '../../utils/globalservice'

export default {
  name: 'create-admin',
  components: {},
  props: [],
  data() {
    return {
      createadminform: {
        associatedwith: null
      },
      associatedOptions: [],
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    //Controls bindings
    bindInstitutes: function () {
      GetRequest('static/institute.json').then(res => {
        this.associatedOptions.push({ value: null,text: '--Select Institute--'})
        if (res) {
          res.forEach(function (element) {
            this.associatedOptions.push({
              value: element.id,
              text: element.name
            })
          }, this);
        }
      });
    },

    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.createadminform));
      this.createadminform = {};
      this.notifySuccess = true;
      //this.$router.push('/Dashboard')
    }
  },
  created: function () {
    this.bindInstitutes();
  }
}
