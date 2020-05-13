<template lang="html">
  <div class="">
    <div class="chart" id="chartdiv">
    </div>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
// import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


export default {
  name: "flag-top-ten",
  props: ['mostAccurate', 'mostInaccurate'],
  data(){
    return{
      chart: null
    }
  },
  mounted() {

    // Themes begin
    am4core.useTheme(am4themes_animated);

    // creates main chart object and defines size
    this.chart = am4core.create("chartdiv", am4core.Container);
    this.chart.width = am4core.percent(100);
    this.chart.height = am4core.percent(100);
    this.chart.layout = "horizontal";

    // sets chart data as mapPerformance data

    // creates subchart for correct answer bars.
    let leftChart = this.chart.createChild(am4charts.XYChart);
    leftChart.paddingRight = 0;
    leftChart.data = JSON.parse(JSON.stringify(this.mostInaccurate));

    // Creates axes categories
    let leftCategoryAxis = leftChart.yAxes.push(new am4charts.CategoryAxis());
    leftCategoryAxis.dataFields.category = "name";
    leftCategoryAxis.renderer.grid.template.location = 0;
    leftCategoryAxis.renderer.inversed = true;
    leftCategoryAxis.renderer.minGridDistance = 10;

    // formats axes display
    let leftValueAxis = leftChart.xAxes.push(new am4charts.ValueAxis());
    leftValueAxis.renderer.inversed = true;
    leftValueAxis.min = 0;
    leftValueAxis.max = 100;
    leftValueAxis.strictMinMax = true;

    leftValueAxis.numberFormatter = new am4core.NumberFormatter();
    leftValueAxis.numberFormatter.numberFormat = "#.#'%'";

    // Create series
    let leftSeries = leftChart.series.push(new am4charts.ColumnSeries());
    leftSeries.dataFields.valueX = "flag_accuracy";
    leftSeries.dataFields.subValueX = "flag_correct_ans";
    leftSeries.dataFields.subTwoValueX = "flag_wrong_ans";
    // leftSeries.dataFields.valueXShow = "percent";
    // leftSeries.calculatePercent = true;
    leftSeries.dataFields.categoryY = "name";
    leftSeries.interpolationDuration = 1000;
    leftSeries.columns.template.tooltipText = "{categoryY}: {valueX.formatNumber('#.0')}% Correct: {subValueX} Wrong:{subTwoValueX}";
    //maleSeries.sequencedInterpolation = true;

    // creates subchart for right answer bars.
    let rightChart = this.chart.createChild(am4charts.XYChart);
    rightChart.paddingLeft = 0;
    rightChart.data = JSON.parse(JSON.stringify(this.mostAccurate));

    // Creates axes categories
    let rightCategoryAxis = rightChart.yAxes.push(new am4charts.CategoryAxis());
    rightCategoryAxis.renderer.inversed = true;
    rightCategoryAxis.renderer.opposite = true;
    rightCategoryAxis.dataFields.category = "name";
    rightCategoryAxis.renderer.grid.template.location = 0;
    rightCategoryAxis.renderer.minGridDistance = 10;

    // formats axes display
    let rightValueAxis = rightChart.xAxes.push(new am4charts.ValueAxis());
    rightValueAxis.min = 0;
    rightValueAxis.max = 100;
    rightValueAxis.strictMinMax = true;
    rightValueAxis.numberFormatter = new am4core.NumberFormatter();
    rightValueAxis.numberFormatter.numberFormat = "#.#'%'";
    rightValueAxis.renderer.minLabelPosition = 0.01;

    // Create series
    let rightSeries = rightChart.series.push(new am4charts.ColumnSeries());
    rightSeries.dataFields.valueX = "flag_accuracy";
    // rightSeries.dataFields.valueXShow = "percent";
    // rightSeries.calculatePercent = true;
    rightSeries.dataFields.subValueX = "flag_correct_ans";
    rightSeries.dataFields.subTwoValueX = "flag_wrong_ans";
    rightSeries.fill = am4core.color("#6bbd8f");
    rightSeries.stroke = rightSeries.fill;

    //maleSeries.sequencedInterpolation = true;
    rightSeries.columns.template.tooltipText = "{categoryY}: {valueX.formatNumber('#.0')}% Correct: {subValueX} Wrong:{subTwoValueX}";
    rightSeries.dataFields.categoryY = "name";
    rightSeries.interpolationDuration = 1000;

    let label = rightCategoryAxis.renderer.labels.template;
    label.truncate = true;
    label.maxWidth = 200;

    let leftLabel = leftCategoryAxis.renderer.labels.template;
    leftLabel.truncate = true;
    leftLabel.maxWidth = 200;

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
  font-size: 16px;
}
</style>
