<template lang="html">
  <div class="">
    <h1>Outline Quiz Map</h1>
    <button v-on:click="setWorld()">World</button>
    <button v-on:click="setEurope()">Europe</button>
    <button v-on:click="setAfrica()">Africa</button>
    <button v-on:click="setAsia()">Asia</button>
    <button v-on:click="setCaribbean()">Caribbean</button>
    <button v-on:click="setCentralAmerica()">Central America</button>
    <button v-on:click="setMiddleEast()">Middle East</button>
    <button v-on:click="setNorthAmerica()">North America</button>
    <button v-on:click="setOceania()">Oceania</button>
    <button v-on:click="setSouthAmerica()">South America</button>
    <outline-map v-if="amMapData":performanceData="mapPerformance" :amMapData="amMapData" :key="componentKey"/>
  </div>
</template>

<script>
import OutlineMap from '@/components/OutlineMap.vue'
import CountriesService from '@/services/CountriesService.js';
import Am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import Am4geodata_europeHigh from "@amcharts/amcharts4-geodata/region/world/europeHigh";
import Am4geodata_africaHigh from "@amcharts/amcharts4-geodata/region/world/africaHigh";
import Am4geodata_asiaHigh from "@amcharts/amcharts4-geodata/region/world/asiaHigh";
import Am4geodata_caribbeanHigh from "@amcharts/amcharts4-geodata/region/world/caribbeanHigh";
import Am4geodata_centralAmericaHigh from "@amcharts/amcharts4-geodata/region/world/centralAmericaHigh";
import Am4geodata_middleEastHigh from "@amcharts/amcharts4-geodata/region/world/middleEastHigh";
import Am4geodata_northAmericaHigh from "@amcharts/amcharts4-geodata/region/world/northAmericaHigh";
import Am4geodata_oceaniaHigh from "@amcharts/amcharts4-geodata/region/world/oceaniaHigh";
import Am4geodata_southAmericaHigh from "@amcharts/amcharts4-geodata/region/world/southAmericaHigh";




export default {
  name: 'outline-quiz',
  props: ['mapPerformance'],
  data(){
    return {
      amMapData: null,
      componentKey: 0,
    }
  },
  mounted(){
    // this.amMapTest = am4geodata_europeHigh
  },
  components: {
    'outline-map': OutlineMap,
  },
  methods: {
    // was unable to pass imported items into functions so separate function was required.
    forceRerender: function(){
      this.componentKey +=1
    },
    setWorld: function(){
      this.amMapData = Am4geodata_worldLow
      this.forceRerender()
    },
    setEurope: function(){
      this.amMapData = Am4geodata_europeHigh
      this.forceRerender()
    },
    setAfrica: function(){
      this.amMapData = Am4geodata_africaHigh
      this.forceRerender()
    },
    setAsia: function(){
      this.amMapData = Am4geodata_asiaHigh
      this.forceRerender()
    },
    setCaribbean: function(){
      this.amMapData = Am4geodata_caribbeanHigh
      this.forceRerender()
    },
    setCentralAmerica: function(){
      this.amMapData = Am4geodata_centralAmericaHigh
      this.forceRerender()
    },
    setMiddleEast: function(){
      this.amMapData = Am4geodata_middleEastHigh
      this.forceRerender()
    },
    setNorthAmerica: function(){
      this.amMapData = Am4geodata_northAmericaHigh
      this.forceRerender()
    },
    setOceania: function(){
      this.amMapData = Am4geodata_oceaniaHigh
      this.forceRerender()
    },
    setSouthAmerica: function(){
      this.amMapData = Am4geodata_southAmericaHigh
      this.forceRerender()
    },

  }



}
</script>

<style lang="css" scoped>
</style>
