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

  

}
</script>

<style lang="css" scoped>
</style>
