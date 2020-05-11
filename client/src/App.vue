<template lang="html">
  <div class="app">
    <h1>Worldly</h1>
    <div class="navbar">
      <button v-on:click="select('mapQuiz')">Map Quiz</button>
      <button v-on:click="select('capitalQuiz')">Capital Quiz</button>
      <button v-on:click="select('flagQuiz')">Flag Quiz</button>
      <button v-on:click="select('performanceCharts')">Performance Charts</button>
      <button v-on:click="select('adminBackend')">Admin</button>
    </div>
    <developer-quote/>
    <outline-quiz v-if="selectedElement === 'mapQuiz'" :mapPerformance="mapPerformance"/>
    <admin-backend v-if="selectedElement === 'adminBackend'" :countries="countries" :mapPerformance="mapPerformance"/>
    <performance-charts v-if="selectedElement === 'performanceCharts'" :countries="countries" :mapPerformance="mapPerformance"/>

    <capitals-quiz v-if="selectedElement === 'capitalQuiz'" :countries="countries"></capitals-quiz>
  </div>
</template>

<script>
import { eventBus } from '@/main.js'
import DeveloperQuote from '@/components/DeveloperQuote.vue'
import OutlineQuiz from '@/components/OutlineQuiz.vue'
import PerformanceCharts from '@/components/PerformanceCharts.vue'
import AdminBackend from '@/components/AdminBackend.vue'
import CountriesService from '@/services/CountriesService.js';
import MapCountriesService from '@/services/MapCountriesService.js';
import CapitalsQuiz from '@/components/CapitalsQuiz.vue'



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

    MapCountriesService.getCountries()
    .then(countries => this.mapPerformance = countries)

    eventBus.$on('amMap-api-data', (serverReturn) => {
      this.mapPerformance = serverReturn
    })

    eventBus.$on('updated-amMap-track-item', (resCountryItem) => {
      const index = this.mapPerformance.findIndex(country => country._id === resCountryItem._id)
      this.bucketList.splice(index, 1, resCountryItem)
      console.log(resCountryItem);
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
    'performance-charts': PerformanceCharts,
    'capitals-quiz': CapitalsQuiz
  }
}
</script>

<style lang="css" scoped>
.app {
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
  Helvetica, Arial, "Lucida Grande", sans-serif;
}
</style>
