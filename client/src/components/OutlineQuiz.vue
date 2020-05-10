<template lang="html">
  <div class="">
    <h1>Outline Quiz Map</h1>
    <outline-map :restCountires="restCountries"/>
    <button v-on:click="populateDatabase">populateDatabase</button>
    <p v-if="restCountries">{{restCountries}}</p>
  </div>
</template>

<script>
import OutlineMap from '@/components/OutlineMap.vue'
import CountriesService from '@/services/CountriesService.js';



export default {
  name: 'outline-quiz',
  components: {
    'outline-map': OutlineMap,
  },
  data(){
    return {
      restCountries: []
    }
  },
  methods: {
    populateDatabase(){
      fetch('http://localhost:3000/restCountries')
      .then(res => res.json())
      .then(data => {
        this.createPerformanceData(data)
      })
    },
    createPerformanceData: function(geoDataArray){
      let performanceArray = []
      for (let country of geoDataArray){
        country.flag_correct_ans = 0
        country.flag_wrong_ans = 0
        country.capital_correct_ans = 0
        country.capital_wrong_ans = 0
        country.map_correct_ans = 0
        country.map_wrong_ans = 0

        performanceArray.push(country)
      }
      this.postArray(performanceArray)
    },
    postArray: function(geoDataArray){
      let serverReturn = []
      for (let country of geoDataArray){
        CountriesService.createCountry(country)
        .then(country => serverReturn.push(country))
      }
      this.restCountries = serverReturn
    }
  }
}
</script>

<style lang="css" scoped>
</style>
