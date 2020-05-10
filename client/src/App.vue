<template lang="html">
  <div class="app">
    <h1>Worldly</h1>
    <div class="navbar">
      <button type="button" v-on:click="selectMapQuiz">Map Quiz</button>
      <button type="button" v-on:click="selectCapitalQuiz">capital Quiz</button>
      <button type="button" v-on:click="selectFlagQuiz">Flag Quiz</button>
    </div>
    <developer-quote></developer-quote>
    <outline-quiz/>
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
      selectedElement: ""
    }
  },
  mounted(){
    fetch('https://restcountries.eu/rest/v2/all')
    .then(result => result.json())
    .then(countries => this.countries = countries)
  },
  methods: {
    selectMapQuiz(){
      this.selectedElement = "mapQuiz";
      return this.selectedElement
      console.log(this.selectedElement);
    },
    selectCapitalQuiz(){
      this.selectedElement = "calitalQuiz";
      return this.selectedElement
    },
    selectFlagQuiz(){
      this.selectedElement = "flagQuiz";
      return this.selectedElement
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
