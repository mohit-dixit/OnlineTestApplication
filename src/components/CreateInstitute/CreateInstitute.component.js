export default  {
  name: 'create-institute',
  components: {},
  props: [],
  data () {
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
      alert(JSON.stringify(this.createinstituteform));
      this.createinstituteform={};
      //this.$router.push('/Dashboard')
    }
  }
}
