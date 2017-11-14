import Vue from 'vue'
export default {
  name: 'test',
  components: {},
  props : {
    date : {
        type: Number,
        coerce: str => Math.trunc(Date.parse(str) / 1000)
    }
  },
  data() {
    this.testStarted = false;
    return {
        testtime: 60 * 60
    }
  },
  computed: {
    seconds() {
        return Math.trunc(this.testtime)%60;
    },
    hours() {
        return Math.trunc((this.testtime) / 60 / 60) % 24;
    },
    minutes() {
        return Math.trunc((this.testtime) / 60) % 60;
    }
  },
  mounted() {
  },
  methods: {
    startTestClick: function(){
      this.testStarted = true;
      this.$forceUpdate();
      window.setInterval(() => {
        this.testtime = this.testtime - 1;
      },1000);
    }
  },
  created: function(){
    this.loginRole = Vue.lsobj.get('loginRole');
  }
}
