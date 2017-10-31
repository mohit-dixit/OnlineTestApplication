<template lang="html">
</template>

<script lang="js">
  export default {
    name: 'api-service',
    props: [],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {
      get() {
        debugger;
        this.$http.get('https://newsapi.org/v1/sources?language=en')
          .then(response => {
            this.sources = response.data.sources;
          });
      }
    },
    computed: {

    },
    created: function() {
      debugger;
      this.$http.get('https://newsapi.org/v1/sources?language=en')
        .then(response => {
          this.sources = response.data.sources;
        });
    }
  }
</script>

<style scoped>

</style>
