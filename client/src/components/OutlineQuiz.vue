<template lang="html">
  <div class="map">

    <h1>Outline Quiz Map <span id="region-prompt" v-if="!amMapData" > - Please select a region.</span></h1>

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
    <outline-map v-if="amMapData":performanceData="mapPerformance" :amMapData="amMapData" :key="componentKey" :giveUp="giveUp"/>
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
import { eventBus } from '@/main.js'





export default {
  name: 'outline-quiz',
  props: ['mapPerformance'],
  data(){
    return {
      amMapData: null,
      componentKey: 0,
      giveUp: false
    }
  },
  mounted() {
    eventBus.$on('give-up', (giveUp) => {
      if (giveUp) {
        this.giveUp = giveUp
        this.forceRerender()
      }
    })
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

.map {
  background: RGBA(245, 239, 203, 0.75);
  border-radius: 4px;
  height: 90%;
  width: 900px;
  font-size: 20px;
  padding: 4px;
}


h1 {
  margin-top: 5px;
  margin-left: 10px;
  margin-bottom: -10px;
}

button {
  background-color: #008CBA;
  outline: 0;
  color: white;
  border-radius: 2px;
  border: 1px solid white;
  padding: 2px 8px;
  margin-bottom: 1px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  transition-duration: 0.4s;
}

button:hover {
  background-color: white;
  color: #008CBA;
}

#region-prompt {
  font-size: 20px;
  color: RGBA(0, 0, 0, 0.7);
  vertical-align: middle;

}

</style>
