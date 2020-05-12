<template lang="html">

  <div>
    <header class="navbar">
    <h1>Worldly</h1>
    <button v-on:click="select('mapQuiz')">Map Quiz</button>
    <button v-on:click="select('capitalQuiz')">Capital Quiz</button>
    <button v-on:click="select('flagQuiz')">Flag Quiz</button>
    <button v-on:click="select('performanceCharts')">Performance Charts</button>
    <button v-on:click="select('adminBackend')">Admin</button>
  </header>

  <div class="app">
    <quiz v-if="selectedElement === 'capitalQuiz'|| selectedElement === 'flagQuiz' " :countries="countries" :selectedElement="selectedElement"></quiz>
    <developer-quote/>
    <outline-quiz v-if="selectedElement === 'mapQuiz'" :mapPerformance="mapPerformance"/>
    <admin-backend v-if="selectedElement === 'adminBackend'" :countries="countries" :mapPerformance="mapPerformance"/>
    <performance-charts v-if="selectedElement === 'performanceCharts'" :countries="countries" :mapPerformance="mapPerformance"/>

  </div>
</div>
</template>

<script>
import { eventBus } from '@/main.js'
import DeveloperQuote from '@/components/DeveloperQuote.vue'
import Quiz from '@/components/Quiz.vue'
import OutlineQuiz from '@/components/OutlineQuiz.vue'
import PerformanceCharts from '@/components/PerformanceCharts.vue'
import AdminBackend from '@/components/AdminBackend.vue'
import CountriesService from '@/services/CountriesService.js';
import MapCountriesService from '@/services/MapCountriesService.js';



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
    'quiz': Quiz,
    'outline-quiz': OutlineQuiz,
    'admin-backend': AdminBackend,
    'performance-charts': PerformanceCharts,

  }
}
</script>

<style>
.app {
  font-family: "Open Sans", "helvetica neue", helvetica, arial, sans-serif;
}
.navbar {
  background-color: blue;
  padding: 0;
  margin: 0;
  content: '';
  width: 100%;
  position: fixed;
  top: -5px;
  left: -5px;
  z-index: 2;
}
body {
  background-image: url('https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1556&q=80');
  background-size: cover;
}
</style>
