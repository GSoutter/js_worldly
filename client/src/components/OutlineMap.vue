<template lang="html">
  <div class="">
    <button v-on:click="randomArrayItem(polygonData)">Generate another country</button>
    <h4 v-if="answerCountry">Find {{this.answerCountry.name}}</h4>
    <h5 v-if="oldEv">you have selected {{this.oldEv.dataItem.dataContext.name}}</h5>
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
      selectedCountry: [],
      map: null,
      polygonData: [],
      oldEv: null,
      answerCountry: null,

    }
  },
  mounted() {
    this.map = am4core.create("chartdiv", am4maps.MapChart)
    this.map.geodata = am4geodata_worldLow
    this.map.projection = new am4maps.projections.Miller()
    var polygonSeries = this.map.series.push(new am4maps.MapPolygonSeries())

    polygonSeries._data = this.polygonData

    //excludes antartica
    polygonSeries.exclude = ["AQ"]
    polygonSeries.useGeodata = true

    var polygonTemplate = polygonSeries.mapPolygons.template;

    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");

    var activeState = polygonTemplate.states.create("active");
    activeState.properties.fill = this.map.colors.getIndex(2);


    // select listener, and highlight
    polygonTemplate.events.on("hit", (ev) => {
      if (this.oldEv) {
        this.oldEv.isActive = false
      }
      ev.target.isActive = !ev.target.isActive;
      console.log(ev.target.dataItem.dataContext.id);

      this.oldEv = ev.target;
    });


  },
  beforeDestroy() {
    if (this.map) {
      this.map.dispose()
    }
  },
  computed: {
    correct() {
      if (!this.answerCountry || !this.oldEv) {
        return false
      }
      if (this.answerCountry.name === this.oldEv.dataItem.dataContext.name) {
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

  }
}
</script>

<style lang="css" scoped>

#chartdiv {
  width: 100%;
  height: 600px;
}
</style>
