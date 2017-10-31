export default  {
  name: 'create-admin',
  components: {},
  props: [],
  data () {
    return {
      createadminform:{}
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.createadminform));
      this.$router.push('/Dashboard')
    }
  }
}
