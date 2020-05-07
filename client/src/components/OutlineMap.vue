<template lang="html">
  <div class="" id="chartdiv">
    <h1>Map div</h1>
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
      selectedCountry: 'france',
      map: null,

    }
  },
  mounted() {
    this.map = am4core.create("chartdiv", am4maps.MapChart)
    this.map.geodata = am4geodata_worldLow
    this.map.projection = new am4maps.projections.Miller()
    var polygonSeries = this.map.series.push(new am4maps.MapPolygonSeries())
    polygonSeries.useGeodata = true
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.events.on("hit", (ev) => {
      // zoom to an object
      // ev.target.series.chart.zoomToMapObject(ev.target);

      // get object info
      console.log(ev.target.dataItem); // dsfa
      this.selectedCountry = ev.target.dataItem.dataContext.name;
      console.log(this.selectedCountry);
    });
  },
  beforeDestroy() {
    if (this.map) {
      this.map.dispose()
    }
  }
}
</script>

<style lang="css" scoped>

#chartdiv {
  width: 100%;
  height: 600px;
}
</style>
