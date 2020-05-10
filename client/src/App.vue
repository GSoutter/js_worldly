<template lang="html">
  <div class="app">
    <h1>Worldly</h1>
    <developer-quote></developer-quote>
    <quiz :countries="countries"></quiz>
  </div>
</template>

<script>
import { eventBus } from '@/main.js'
import DeveloperQuote from '@/components/DeveloperQuote.vue'
import Quiz from '@/components/Quiz.vue'



export default {
  name: 'App',
  data(){
    return {
      countries: []
    }
  },
  mounted(){
    fetch('https://restcountries.eu/rest/v2/all')
    .then(result => result.json())
    .then(countries => this.countries = countries)
  },

  components: {
    'developer-quote': DeveloperQuote,
    'quiz': Quiz
  }
}
</script>

<style lang="css" scoped>
.app {
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
Helvetica, Arial, "Lucida Grande", sans-serif;
}
</style>
