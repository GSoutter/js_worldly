<template lang="html">
  <div class="">
    <h3>Admin for Backend</h3>
    <p>Countries from RestAPI: {{countries.length}}</p>
    <button v-on:click="populateRestCountriesDb(false)">Pop database with RestAPI + tracking(blank)</button>
    <button v-on:click="populateRestCountriesDb(true)">Pop database with RestAPI + tracking(random)</button>
    <p>Countries in Outline map tracking: {{mapPerformance.length}}</p>
    <button v-on:click="populateMapCountriesDb(false)">Pop database with Outline Map tracking(blank)</button>
    <button v-on:click="populateMapCountriesDb(true)">Pop database with Outline Map tracking(random)</button>
    <br>
    <hr>
    <p>To clear all data, run npm run seeds in server folder</p>
  </div>
</template>

<script>
import CountriesService from '@/services/CountriesService.js';
import MapCountriesService from '@/services/MapCountriesService.js';
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

import { eventBus } from '@/main.js'

export default {
  name: 'admin-backend',
  props: ['countries', 'mapPerformance'],
  methods: {
    populateRestCountriesDb: function(isRandom){
      fetch('http://localhost:3000/restCountries')
      .then(res => res.json())
      .then(data => {
        this.createPerformanceData(data, isRandom)
      })
    },

    createPerformanceData: function(geoDataArray, isRandom){
      let performanceArray = []
      if (isRandom) {
        for (let country of geoDataArray){
          country.flag_correct_ans =  Math.floor(Math.random() * 100)
          country.flag_wrong_ans =  Math.floor(Math.random() * 100)
          country.capital_correct_ans =  Math.floor(Math.random() * 100)
          country.capital_wrong_ans =  Math.floor(Math.random() * 100)

          performanceArray.push(country)
        }
      }
      if (!isRandom) {
        for (let country of geoDataArray){
          country.flag_correct_ans = 0
          country.flag_wrong_ans = 0
          country.capital_correct_ans = 0
          country.capital_wrong_ans = 0

          performanceArray.push(country)
        }
      }

      this.postArray(performanceArray)
    },
    postArray: function(geoDataArray){
      let serverReturn = []
      for (let country of geoDataArray){
        CountriesService.createCountry(country)
        .then(country => serverReturn.push(country))
      }
      eventBus.$emit('rest-api-data', serverReturn)
    },
    populateMapCountriesDb: function(isRandom){
      const performanceData = []
      for (let country of am4geodata_worldLow.features){
        let entry = {
          id: country.properties.id,
          name: country.properties.name,
        }
        if (isRandom) {
          entry.correct_answers = Math.floor(Math.random() * 100)
          entry.wrong_answers = Math.floor(Math.random() * 100)
        }
        if (!isRandom) {
          entry.correct_answers = 0
          entry.wrong_answers = 0
        }
        performanceData.push(entry)
      }
      this.postMapArray(performanceData)
    },
    postMapArray: function(geoDataArray){
      let serverReturn = []
      for (let country of geoDataArray){
        MapCountriesService.createCountry(country)
        .then(country => serverReturn.push(country))
      }
      eventBus.$emit('amMap-api-data', serverReturn)
    },

  }
}
</script>

<style lang="css" scoped>
</style>
