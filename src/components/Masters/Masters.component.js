import ApiService from '../../components/ApiService.vue'

export default {
  name: 'masters',
  components: {},
  props: [],
  data() {
    return {

    }
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
    }
  },
  created: function () {
    this.$http.get('https://newsapi.org/v1/sources?language=en')
      .then(response => {
        this.sources = response.data.sources;
      });
  }
  // ,
  // watch: {
  //   source: function (val) {
  //     this.updateSource(val);
  //   }
  // }
}
