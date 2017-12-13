import Vue from "vue";
var bus = new Vue();
export default  {
  name: 'spinner',
  components: {},
  props: [],
  data () {
    this.showSpinner = true;
    return {
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    show : function(){
      this.showSpinner = true;
    },
    hide: function(){
      this.showSpinner = false;
    }
  }
}
