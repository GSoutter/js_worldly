<template lang="html">
  <div class="chart-component">
    <h1>Performance Charts <span id="region-prompt">
      <button :class="{'active-button':(selectedElement === 'mapQuiz')}" v-on:click="select('mapQuiz')">Map Quiz</button>
      <button :class="{'active-button':(selectedElement === 'capitalQuiz')}" v-on:click="select('capitalQuiz')">Capital Quiz</button>
      <button :class="{'active-button':(selectedElement === 'flagQuiz')}" v-on:click="select('flagQuiz')">Flag Quiz</button>
      <span v-if="!selectedElement" > - Please select</span>

    </span></h1>


    <div class="map-quiz" v-if="selectedElement === 'mapQuiz'">

      <button :class="{'active-button':(chartSelect === 'heatmap')}" v-on:click="selectChart('heatmap')">Heatmap</button>
      <button  :class="{'active-button':(chartSelect === 'table')}" v-on:click="selectChart('table')">Top 10 Table</button>

      <div  v-if="chartSelect === 'table'">
        <map-chart v-if="mapMostInaccurate"
        :mapMostAccurate="mapMostAccurate"
        :mapMostInaccurate="mapMostInaccurate" />
      </div>

      <div  v-if="chartSelect === 'heatmap'">
        <heat-map v-if="mapPerformanceAccuracy"
        :mapPerformanceAccuracy="mapPerformanceAccuracyOnly" />
      </div>
    </div>

    <div v-if="selectedElement === 'capitalQuiz'">
      <capital-chart v-if="capitalMostInaccurate"
      :mostAccurate="capitalMostAccurate"
      :mostInaccurate="capitalMostInaccurate" />
    </div>

    <div v-if="selectedElement === 'flagQuiz'">
      <flag-chart v-if="flagMostInaccurate"
      :mostAccurate="flagMostAccurate"
      :mostInaccurate="flagMostInaccurate" />
    </div>


  </div>
</template>

<script>
import MapChart from '@/components/charts/MapChart.vue'
import FlagChart from '@/components/charts/FlagChart.vue'
import CapitalChart from '@/components/charts/CapitalChart.vue'
import HeatMap from '@/components/charts/HeatMap.vue'

export default {
  name: "performance-charts",
  props: ['countries', 'mapPerformance'],
  data(){
    return{
      selectedElement: null,
      chartSelect: null,
      mapPerformanceAccuracy: null,
      mapPerformanceAccuracyOnly: null,
      mapMostAccurate: null,
      mapMostInaccurate: null,
      capitalPerformanceAccuracy: null,
      capitalMostAccurate: null,
      capitalMostInaccurate: null,
      flagPerformanceAccuracy: null,
      flagMostAccurate: null,
      flagMostInaccurate: null,

    }
  },
  mounted() {
    // calculates accuracy of guesses
    this.mapPerformanceAccuracy = this.getAccuracy(this.mapPerformance,
      'correct_answers','wrong_answers', 'map_accuracy' )
    this.mapPerformanceAccuracyOnly = this.getAccuracyOnly(this.mapPerformance,
      'correct_answers','wrong_answers', 'map_accuracy' )
    // gets 10 countries where the user has performed the best
    this.mapMostAccurate = this.getTopTenAccurate(this.mapPerformanceAccuracy,
      'correct_answers','wrong_answers', 'map_accuracy', true )
    // gets 10 countries where the user has performed the worst
    this.mapMostInaccurate = this.getTopTenAccurate(this.mapPerformanceAccuracy,
      'correct_answers','wrong_answers', 'map_accuracy', false )

    this.capitalPerformanceAccuracy = this.getAccuracy(this.countries,
      'capital_correct_ans','capital_wrong_ans', 'capital_accuracy' )
    // gets 10 countries where the user has performed the best
    this.capitalMostAccurate = this.getTopTenAccurate(this.capitalPerformanceAccuracy,
      'capital_correct_ans','capital_wrong_ans', 'capital_accuracy', true )
    // gets 10 countries where the user has performed the worst
    this.capitalMostInaccurate = this.getTopTenAccurate(this.capitalPerformanceAccuracy,
      'capital_correct_ans','capital_wrong_ans', 'capital_accuracy', false )

    this.flagPerformanceAccuracy = this.getAccuracy(this.countries,
      'flag_correct_ans','flag_wrong_ans', 'flag_accuracy' )
    // gets 10 countries where the user has performed the best
    this.flagMostAccurate = this.getTopTenAccurate(this.capitalPerformanceAccuracy,
      'flag_correct_ans','flag_wrong_ans', 'flag_accuracy', true )
    // gets 10 countries where the user has performed the worst
    this.flagMostInaccurate = this.getTopTenAccurate(this.capitalPerformanceAccuracy,
      'flag_correct_ans','flag_wrong_ans', 'flag_accuracy', false )


  }, // mounted end

  methods: {
    select: function(element) {
      this.selectedElement = element
    },
    selectChart: function(element) {
      this.chartSelect = element
    },
    getAccuracy: function(array, rightKey, wrongKey, fieldName){
      // loops through array, calculating guess accuracy and adding to object.
      for (let country of array) {
        country[fieldName] = (country[rightKey] / (country[wrongKey] + country[rightKey]))*100
      }
      return array
    },
    getAccuracyOnly: function(array, rightKey, wrongKey, fieldName){
      // loops through array, calculating guess accuracy and adding to object.
      let newArray = []
      for (let country of array) {
        let entry = {
          id: country.id,
          value: (country[rightKey] / (country[wrongKey] + country[rightKey]))*100,
        }
        newArray.push(entry)
      }
      return newArray
    },

    getTopTenAccurate: function(array, rightKey, wrongKey, fieldName, isAccurate){
      let accuracyArray = []
      let sortedArray = []

      // check if array is to be sorted by most or least accurate
      if (isAccurate) {
        sortedArray = array.sort((a,b) => {return b[fieldName] - a[fieldName]})
      } else {
        sortedArray = array.sort((a,b) => {return a[fieldName] - b[fieldName]})
      }

      // loops through sorted array. Checks if there are greater than 20 answers, pushes to array. Once there are 10 items it returns.
      for (let country of sortedArray) {
        let totalAnswers = country[rightKey] + country[wrongKey]
        if ((totalAnswers > 10)) {
          accuracyArray.push(country)
        }
        if (accuracyArray.length >= 10) {
          return accuracyArray
        }
      }
      // return to catch if there are less than 10 values.
      return accuracyArray
    },
  },
  components: {
    'map-chart': MapChart,
    'flag-chart': FlagChart,
    'capital-chart': CapitalChart,
    'heat-map': HeatMap,
  }
}
</script>

<style lang="css" scoped>

/* .chart{
  height: 600px;
  font-size: 10px;
} */
.chart-component{
  background: RGBA(245, 239, 203, 0.75);
  border-radius: 4px;
  height: 100%;
  width: 900px;
  font-size: 20px;
  padding: 4px;
}

h1 {
  margin-top: 5px;
  margin-left: 10px;
  margin-bottom: 1px;
}
span {

}




button {
  background-color: #008CBA;
  outline: 0;
  color: white;
  border-radius: 2px;
  border: 1px solid white;
  padding: 2px 12px;
  margin-bottom: 1px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
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
  align-self: end;
}

.active-button{
  background-color: white;
  color: #008CBA;
}

.map-quiz button {
  font-size: 14px;
  padding: 1px 4px;
}

</style>
