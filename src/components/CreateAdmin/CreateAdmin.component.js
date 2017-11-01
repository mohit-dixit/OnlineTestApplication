import Vue from 'vue'
export default  {
  name: 'create-admin',
  components: {},
  props: [],
  data () {
    return {
      createadminform:{
        associatedwith: null
      },
      associatedOptions: [
        { value: null, text: '--Select Institute--' },
        { value: '1', text: 'KN Modi College' },
        { value: '2', text: 'KIET College' },
        { value: '3', text: 'NIIT Rajnagar Ghaziabad' },
        { value: '4', text: 'ITS Mohan Nagar' }
      ]
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
