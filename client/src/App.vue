<template lang="html">
  <div class="app">
    <h1>Worldly</h1>
    <div class="navbar">
      <button v-on:click="select('mapQuiz')">Map Quiz</button>
      <button v-on:click="select('capitalQuiz')">Capital Quiz</button>
      <button v-on:click="select('flagQuiz')">Flag Quiz</button>
    </div>
    <developer-quote/>
    <outline-quiz v-if="selectedElement === 'mapQuiz'"/>
  </div>
</template>

<script>
import { eventBus } from '@/main.js'
import DeveloperQuote from '@/components/DeveloperQuote.vue'
import OutlineQuiz from '@/components/OutlineQuiz.vue'



export default {
  name: 'App',
  data(){
    return {
      countries: [],
      selectedElement: ''
    }
  },
  mounted(){
    fetch('https://restcountries.eu/rest/v2/all')
    .then(result => result.json())
    .then(countries => this.countries = countries)
  },
  methods: {
    select(element) {
      this.selectedElement = element
    }

  },
  components: {
    'developer-quote': DeveloperQuote,
    'outline-quiz': OutlineQuiz,
  }
}
</script>

<style lang="css" scoped>
.app {
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
  Helvetica, Arial, "Lucida Grande", sans-serif;
}
</style>
