<template lang="html">
  <div class="">
    <h1>Outline Quiz Map</h1>
    <outline-map :performanceData="mapPerformance" />
  </div>
</template>

<script>
import OutlineMap from '@/components/OutlineMap.vue'
import CountriesService from '@/services/CountriesService.js';



export default {
  name: 'outline-quiz',
  props: ['mapPerformance'],
  components: {
    'outline-map': OutlineMap,
  },



}
</script>

<style lang="css" scoped>
</style>
