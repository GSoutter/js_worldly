<template lang="html">
  <div class="">
    <h3>Hello</h3>
    <div class="chart" id="chartdiv">
    </div>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


export default {
  name: "performance-charts",
  props: ['countries', 'mapPerformance'],
  data(){
    return{
      chart: null
    }
  },
  mounted() {
    // am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);

    // creates main chart object and defines size
    this.chart = am4core.create("chartdiv", am4core.Container);
    this.chart.width = am4core.percent(100);
    this.chart.height = am4core.percent(100);
    this.chart.layout = "horizontal";

    // sets chart data as mapPerformance data
    let chartData = this.mapPerformance

    // creates subchart for correct answer bars.
    let correctChart = this.chart.createChild(am4charts.XYChart);
    correctChart.paddingRight = 0;
    correctChart.data = JSON.parse(JSON.stringify(chartData));

    // Creates axes categories
    let correctCategoryAxis = correctChart.yAxes.push(new am4charts.CategoryAxis());
    correctCategoryAxis.dataFields.category = "name";
    correctCategoryAxis.renderer.grid.template.location = 0;
    // correctCategoryAxis.renderer.inversed = true;
    correctCategoryAxis.renderer.minGridDistance = 10;

    // formats axes display
    let correctValueAxis = correctChart.xAxes.push(new am4charts.ValueAxis());
    correctValueAxis.renderer.inversed = true;
    correctValueAxis.min = 0;
    correctValueAxis.max = 100;
    correctValueAxis.strictMinMax = true;

    correctValueAxis.numberFormatter = new am4core.NumberFormatter();
    correctValueAxis.numberFormatter.numberFormat = "#.#";

    // Create series
    let correctSeries = correctChart.series.push(new am4charts.ColumnSeries());
    correctSeries.dataFields.valueX = "correct_answers";
    // correctSeries.dataFields.valueXShow = "correct_answers";
    // correctSeries.calculatePercent = true;
    correctSeries.dataFields.categoryY = "name";
    correctSeries.interpolationDuration = 1000;
    correctSeries.columns.template.tooltipText = "{categoryY}: {valueX}";
    //maleSeries.sequencedInterpolation = true;

    // creates subchart for wrong answer bars.
    let wrongChart = this.chart.createChild(am4charts.XYChart);
    wrongChart.paddingRight = 0;
    wrongChart.data = JSON.parse(JSON.stringify(chartData));

    // Creates axes categories
    let wrongCategoryAxis = wrongChart.yAxes.push(new am4charts.CategoryAxis());
    wrongCategoryAxis.renderer.opposite = true;
    wrongCategoryAxis.dataFields.category = "name";
    wrongCategoryAxis.renderer.grid.template.location = 0;
    //wrongCategoryAxis.renderer.inversed = true;
    wrongCategoryAxis.renderer.minGridDistance = 10;

    // formats axes display
    let wrongValueAxis = wrongChart.xAxes.push(new am4charts.ValueAxis());
    wrongValueAxis.renderer.inversed = true;
    wrongValueAxis.min = 0;
    wrongValueAxis.max = 100;
    wrongValueAxis.strictMinMax = true;
    wrongValueAxis.numberFormatter = new am4core.NumberFormatter();
    wrongValueAxis.numberFormatter.numberFormat = "#.#";
    wrongValueAxis.renderer.minLabelPosition = 0.01;

    // Create series
    let wrongSeries = wrongChart.series.push(new am4charts.ColumnSeries());
    wrongSeries.dataFields.valueX = "wrong_answers";
    // wrongSeries.dataFields.valueXShow = "wrong_answers";
    // wrongSeries.calculatePercent = true;
    wrongSeries.fill = wrongChart.colors.getIndex(4);

    wrongSeries.interpolationDuration = 1000;
    wrongSeries.columns.template.tooltipText = "{categoryY}: {valueX}";
    //maleSeries.sequencedInterpolation = true;
    wrongSeries.dataFields.categoryY = "name";
    wrongSeries.interpolationDuration = 1000;



  }, // mounted end
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  },
  methods: {

  }
}
</script>

<style lang="css" scoped>

.chart{
  height: 600px;
  font-size: 10px;
}
</style>
