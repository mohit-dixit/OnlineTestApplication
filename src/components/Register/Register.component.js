export default  {
  name: 'register',
  components: {},
  props: [],
  data () {
    return {
      registerform:{}

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.registerform));
      this.$router.push('/')
    }
  }
}
