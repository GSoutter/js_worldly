<template lang="html">
  <div class="">


    <div class="" id="chartdiv">
    </div>
    <h3 v-if="answerCountry && !answerCorrect">Where is {{this.answerCountry.name}}?</h3>
    <h3 v-if="answerCorrect">Well done you found {{this.answerCountry.name}}.</h3>
    <h5 v-if="selectedCountry">You have selected {{this.selectedCountry.dataItem.dataContext.name}}</h5>
    <button v-if="!answerCountry"v-on:click="randomArrayItem(polygonData)">Give me a country!</button>
    <button v-if="!answerCorrect && answerCountry" v-on:click="randomArrayItem(polygonData)">Give me a different country!</button>
    <button v-if="answerCorrect" v-on:click="resetAnswer">Another round?</button>
    <button v-if="!answerCorrect && !giveUpZoom && answerCountry" v-on:click="giveUpMethod">Give Up? Show me</button>
  </div>

</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { eventBus } from '@/main.js'
import MapCountriesService from '@/services/MapCountriesService.js';



am4core.useTheme(am4themes_animated);

export default {
  name: 'outline-map',
  props: ['performanceData', 'amMapData', 'giveUp'],
  data() {
    return {
      map: null,
      polygonData: [],
      selectedCountry: null,
      answerCountry: null,
      worldCountryPolygonData: null,
      answerCorrect: false,
      giveUpZoom: null,

    }
  },
  mounted() {

    this.map = am4core.create("chartdiv", am4maps.MapChart)
    this.map.geodata = this.amMapData
    this.map.projection = new am4maps.projections.Miller()
    this.map.panBehavior = "rotateLong"
    var polygonSeries = this.map.series.push(new am4maps.MapPolygonSeries())

    this.worldCountryPolygonData = this.amMapData.features
    // assign data to polygonData variable stored in vue. To allow for randomising country.  Doesn't work the other way round, this may be due to polygon series taking time to load, and is overwritten severing connection to the polygonData varible. Tried looking for a proper way to get this data but could not.
    polygonSeries._data = this.polygonData

    //excludes antartica from polygon data
    polygonSeries.exclude = ["AQ"]
    polygonSeries.useGeodata = true

    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.fill = am4core.color("#d2e6c1")
    polygonTemplate.stroke = am4core.color("#395C6B")
    // F5ECCB

    // assign hover state to variable and assigns color. Hover is activated when mouse is over object in browswer wind.
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");


    // assigns active state to varaible and changes fill colour.
    var activeState = polygonTemplate.states.create("active");
    activeState.properties.fill = this.map.colors.getIndex(2);


    this.giveUpZoom = this.giveUp

    // on click listener for objects on map and highlight.
    polygonTemplate.events.on("hit", (ev) => {


      if (this.giveUpZoom) {
        console.log("disable hit");
        var country = polygonSeries.getPolygonById(this.giveUpZoom);
        if (country) {
          country.isActive = false
        }

        this.giveUpZoom = null
      }


      if (this.selectedCountry !== ev.target) {
        // check if a previous event has been stored and then changes to false
        if (this.selectedCountry) {
          this.selectedCountry.isActive = false
        }



        // sets target clicked to active. To show coloring
        ev.target.isActive = !ev.target.isActive;

        // saves event to deactivate for next object clicked and for use in checking methods.
        this.selectedCountry = ev.target;

        // trigger check if answer is correct.
        this.correct()
      }

    });


    if (this.giveUpZoom) {


      this.map.events.on("ready", ev => {

        let zoomTo = [this.giveUpZoom];
        let country = polygonSeries.getPolygonById(zoomTo)
        if (country) {
          country.isActive = true

          // Pre-zoom
          this.map.zoomToMapObject(country);
        }


      });
    }



  },
  beforeDestroy() {
    if (this.map) {
      this.map.dispose()
    }
  },
  computed: {

  },
  methods: {
    randomArrayItem: function(array){
      // console.log('buttonClicked');
      const max = array.length;
      const randomIndex = Math.floor(Math.random() * Math.floor(max));
      // console.log(array[randomIndex]);
      this.answerCountry = array[randomIndex];
    },
    resetAnswer: function(){
      this.answerCorrect = false
      this.randomArrayItem(this.polygonData)
    },
    giveUpMethod: function(){
      eventBus.$emit('give-up', this.answerCountry.id)
    },

    correct: function(){
      // check if answer is already true to avoid wrong answer being logged after correct answer has been given.
      if (this.answerCorrect) {
        return;
      }
      // check if answer and selection are present.
      if (!this.answerCountry || !this.selectedCountry) {
        return this.answerCorrect = false
      }

      // check if selection is equal to answer
      if (this.answerCountry.name === this.selectedCountry.dataItem.dataContext.name) {
        // result is true. Finds element in performance array. Increments by one. logs for error checking. sets answer to true.
        const countryPerformanceObject = this.performanceData.find(country => country.name === this.answerCountry.name)
        countryPerformanceObject.correct_answers += 1
        // console.log(countryPerformanceObject.name, "correct: ",countryPerformanceObject.correct_answers);
        const id = countryPerformanceObject._id
        const updatedObject = {
          correct_answers: countryPerformanceObject.correct_answers
        }
        MapCountriesService.updateCountry(id, updatedObject)
        .then(resCountryItem => eventBus.$emit('updated-amMap-track-item', resCountryItem))

        return this.answerCorrect = true
      } else {
        // result is false. finds element. Increments wrong answer by on. logs for error checking. sets answer to false. Although in this implenation is redundant.
        const countryPerformanceObject = this.performanceData.find(country => country.name === this.answerCountry.name)
        countryPerformanceObject.wrong_answers += 1
        // console.log(countryPerformanceObject.name, "Wrong: ", countryPerformanceObject.wrong_answers);
        const id = countryPerformanceObject._id
        const updatedObject = {
          wrong_answers: countryPerformanceObject.wrong_answers
        }
        MapCountriesService.updateCountry(id, updatedObject)
              .then(resCountryItem => eventBus.$emit('updated-amMap-track-item', resCountryItem))

        return this.answerCorrect = false
      }
    }


  }
}
</script>

<style lang="css" scoped>

#chartdiv {
  width: 100%;
  height: 500px;
  margin-top: 4px;
  background-color: RGBA(170, 223, 239, 0.75);
  border-radius: 4px;

}

button {
  background-color: #008CBA;
  outline: 0;
  color: white;
  border: 1px solid white;
  padding: 5px 15px;
  margin-bottom: 1px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  transition-duration: 0.4s;
}

button:hover {
  background-color: white;
  color: #008CBA;
}

</style>
