<template lang="html">

  <div class="app">
    <header>
    <h1>Worldly</h1>
    <span>
    <nav>
    <button v-on:click="select('mapQuiz')">Map Quiz</button>
    <button v-on:click="select('capitalQuiz')">Capitals Quiz</button>
    <button v-on:click="select('flagQuiz')">Flag Quiz</button>
    <button v-on:click="select('performanceCharts')">Performance Charts</button>
    <button v-on:click="select('adminBackend')">Admin</button>
    </nav>
  </span>
  </header>

  <div class="content">
    <quiz v-if="selectedElement === 'capitalQuiz'|| selectedElement === 'flagQuiz' " :countries="countries" :selectedElement="selectedElement"></quiz>
    <!-- <developer-quote/> -->
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
      this.mapPerformance.splice(index, 1, resCountryItem)
      console.log(resCountryItem);
    })

    eventBus.$on('updated-country-track-item', (resCountryItem) => {
      const index = this.mapPerformance.findIndex(country => country._id === resCountryItem._id)
      this.countries.splice(index, 1, resCountryItem)
      console.log(resCountryItem);
    })

    // eventBus.$on('updated-capital-track-item', (resCountryItem) => {
    //   const index = this.mapPerformance.findIndex(country => country._id === resCountryItem._id)
    //   this.bucketList.splice(index, 1, resCountryItem)
    //   console.log(resCountryItem);
    // })

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

@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.app {
font-family: 'Roboto', sans-serif;}

.content{
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;


}
header {
  background-color: RGBA(152, 193, 217, 0.8);
  display: flex;
  align-items: center;
  border: 1px black solid;
  padding: 0;
  margin: 0;
  content: '';
  width: 100%;
  position: fixed;
  top: -5px;
  left: -1px;
  z-index: 2;
}
header > h1{
  font-family: 'Amatic SC', cursive, serif;
  font-size: 64px;
  display: inline-block;
  padding: 0;
  margin: 0;
  margin-left: 20px;
}

nav{
  margin-top: 35px;
  margin-left: 50px;

}

nav button {
  background-color: #008CBA;
  border: none;
  outline: 0;
  color: white;
  border: 2px solid #008CBA;
  padding: 10px 25px;
  margin-bottom: 20px;
  margin-top: -50px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  transition-duration: 0.4s;
}

nav button:hover {
  background-color: white;
  color: #008CBA;
}

body {
  background: url('https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1556&q=80') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
