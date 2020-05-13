<template lang="html">
  <div class="">

    <div class="" id="chartdiv">
    </div>
  </div>

</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { eventBus } from '@/main.js'
import MapCountriesService from '@/services/MapCountriesService.js';



am4core.useTheme(am4themes_animated);

export default {
  name: 'heat-map',
  props: ['mapPerformanceAccuracy'],
  data() {
    return {
      map: null,
      polygonData: [],
      selectedCountry: null,
      answerCountry: null,
      worldCountryPolygonData: null,
      answerCorrect: false

    }
  },
  mounted() {
    // this.map = am4core.create("chartdiv", am4maps.MapChart)
    // this.map.geodata = Am4geodata_worldLow
    // this.map.projection = new am4maps.projections.Miller()
    // var polygonSeries = this.map.series.push(new am4maps.MapPolygonSeries())
    // am4core.useTheme(am4themes_animated);



    this.map = am4core.create("chartdiv", am4maps.MapChart);
    this.map.hiddenState.properties.opacity = 0; // this creates initial fade-in

    this.map.geodata = Am4geodata_worldLow;
    this.map.projection = new am4maps.projections.Miller();

    var title = this.map.chartContainer.createChild(am4core.Label);
    title.text = "Accuracy";
    title.fontSize = 20;
    title.paddingTop = 30;
    title.align = "start";
    title.zIndex = 100;

    var polygonSeries = this.map.series.push(new am4maps.MapPolygonSeries());
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value.value.formatNumber('#.0')}%";
    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: am4core.color("#ffffff"),
      max: am4core.color("#2ca25f")
    });
    polygonSeries.useGeodata = true;

    // add heat legend
    var heatLegend = this.map.chartContainer.createChild(am4maps.HeatLegend);
    heatLegend.valign = "bottom";
    heatLegend.align = "left";
    heatLegend.width = am4core.percent(100);
    heatLegend.series = polygonSeries;
    heatLegend.orientation = "horizontal";
    heatLegend.padding(20, 20, 20, 20);
    heatLegend.valueAxis.renderer.labels.template.fontSize = 10;
    heatLegend.valueAxis.renderer.minGridDistance = 40;

    polygonSeries.mapPolygons.template.events.on("over", event => {
      handleHover(event.target);
    });

    polygonSeries.mapPolygons.template.events.on("hit", event => {
      handleHover(event.target);
    });

    function handleHover(mapPolygon) {
      if (!isNaN(mapPolygon.dataItem.value)) {
        heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value);
      } else {
        heatLegend.valueAxis.hideTooltip();
      }
    }

    polygonSeries.mapPolygons.template.strokeOpacity = 0.4;
    polygonSeries.mapPolygons.template.events.on("out", event => {
      heatLegend.valueAxis.hideTooltip();
    });

    this.map.zoomControl = new am4maps.ZoomControl();
    this.map.zoomControl.valign = "top";

    polygonSeries.data = this.mapPerformanceAccuracy

    polygonSeries.exclude = ["AQ"];

  },
  beforeDestroy() {
    if (this.map) {
      this.map.dispose()
    }
  },
  computed: {

  },
  methods: {


  }
}
</script>

<style lang="css" scoped>

#chartdiv {
  width: 100%;
  height: 600px;
  
}
</style>
