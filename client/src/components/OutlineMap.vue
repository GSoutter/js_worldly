<template lang="html">
  <div class="">
    <button v-on:click="randomArrayItem(polygonData)">Generate another country</button>
    <button v-on:click="createPerformanceData(worldCountryPolygonData)">Generate blank performanceData</button>
    <button v-on:click="createTestPerformanceData(worldCountryPolygonData)">Generate test performanceData</button>
    <h4 v-if="answerCountry">Find {{this.answerCountry.name}}</h4>
    <h5 v-if="selectedCountry">you have selected {{this.selectedCountry.dataItem.dataContext.name}}</h5>
    <button  v-if="correct" v-on:click="resetAnswer">Well done. Try agin?</button>

    <div class="" id="chartdiv">
    </div>
  </div>

</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps"
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { eventBus } from '@/main.js'


am4core.useTheme(am4themes_animated);

export default {
  name: 'outline-map',
  data() {
    return {
      map: null,
      polygonData: [],
      selectedCountry: null,
      answerCountry: null,
      worldCountryPolygonData: null,
      performanceData: [],
      testPerformanceData: [],

    }
  },
  mounted() {
    this.map = am4core.create("chartdiv", am4maps.MapChart)
    this.map.geodata = am4geodata_worldLow
    this.map.projection = new am4maps.projections.Miller()
    var polygonSeries = this.map.series.push(new am4maps.MapPolygonSeries())

    this.worldCountryPolygonData = am4geodata_worldLow.features
    // assign data to polygonData variable stored in vue. To allow for randomising country.  Doesn't work the other way round, this may be due to polygon series taking time to load, and is overwritten severing connection to the polygonData varible. Tried looking for a proper way to get this data but could not.
    polygonSeries._data = this.polygonData

    //excludes antartica from polygon data preventing
    polygonSeries.exclude = ["AQ"]
    polygonSeries.useGeodata = true

    var polygonTemplate = polygonSeries.mapPolygons.template;


    // assign hover state to variable and assigns color. Hover is activated when mouse is over object in browswer wind.
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");


    // assigns active state to varaible and changes fill colour.
    var activeState = polygonTemplate.states.create("active");
    activeState.properties.fill = this.map.colors.getIndex(2);


    // on click listener for objects on map and highlight
    polygonTemplate.events.on("hit", (ev) => {
      // check if a previous event has been stored and then changes to false
      if (this.selectedCountry) {
        this.selectedCountry.isActive = false
      }

      // sets target clicked to active. To show coloring
      ev.target.isActive = !ev.target.isActive;

      // saves event to deactivate for next object clicked and for use in checking methods.
      this.selectedCountry = ev.target;
    });


  },
  beforeDestroy() {
    if (this.map) {
      this.map.dispose()
    }
  },
  computed: {
    correct() {
      if (!this.answerCountry || !this.selectedCountry) {
        return false
      }
      if (this.answerCountry.name === this.selectedCountry.dataItem.dataContext.name) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    randomArrayItem: function(array){
      console.log('buttonClicked');
      const max = array.length;
      const randomIndex = Math.floor(Math.random() * Math.floor(max));
      console.log(array[randomIndex]);
      this.answerCountry = array[randomIndex];
    },
    resetAnswer: function(){
      this.randomArrayItem(this.polygonData)
    },
    createPerformanceData: function(geoDataArray){
      this.performanceData = []
      for (let country of geoDataArray){
        let entry = {
          id: country.properties.id,
          name: country.properties.name,
          correct_answers: 0,
          wrong_answers: 0,
        }
        this.performanceData.push(entry)
      }
    },
    createTestPerformanceData: function(geoDataArray){
      this.testPerformanceData = []
      for (let country of geoDataArray){
        let entry = {
          id: country.properties.id,
          name: country.properties.name,
          correct_answers: Math.floor(Math.random() * 100),
          wrong_answers: Math.floor(Math.random() * 100),
        }
        this.testPerformanceData.push(entry)
      }
    },


  }
}
</script>

<style lang="css" scoped>

#chartdiv {
  width: 100%;
  height: 600px;
}
</style>
