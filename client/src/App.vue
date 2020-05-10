<template lang="html">
  <div class="app">
    <h1>Worldly</h1>
    <div class="navbar">
      <button v-on:click="select('mapQuiz')">Map Quiz</button>
      <button v-on:click="select('capitalQuiz')">Capital Quiz</button>
      <button v-on:click="select('flagQuiz')">Flag Quiz</button>
      <button v-on:click="select('adminBackend')">Admin</button>
    </div>
    <developer-quote/>
    <outline-quiz v-if="selectedElement === 'mapQuiz'"/>
    <admin-backend v-if="selectedElement === 'adminBackend'" :countries="countries" :mapPerformance="mapPerformance"/>
  </div>
</template>

<script>
import { eventBus } from '@/main.js'
import DeveloperQuote from '@/components/DeveloperQuote.vue'
import OutlineQuiz from '@/components/OutlineQuiz.vue'
import AdminBackend from '@/components/AdminBackend.vue'
import CountriesService from '@/services/CountriesService.js';




export default {
  name: 'App',
  data(){
    return {
      countries: [],
      mapPerformance: [],
      selectedElement: '',
    }
  },
  mounted(){
    CountriesService.getCountries()
    .then(countries => this.countries = countries)

    eventBus.$on('rest-api-data', (serverReturn) => {
      this.countries = serverReturn
    })


  },
  methods: {
    select(element) {
      this.selectedElement = element
    }

  },
  components: {
    'developer-quote': DeveloperQuote,
    'outline-quiz': OutlineQuiz,
    'admin-backend': AdminBackend,
  }
}
</script>

<style lang="css" scoped>
.app {
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
  Helvetica, Arial, "Lucida Grande", sans-serif;
}
</style>
