<template lang="html">
  <div class="">
    <h2>Performance Charts</h2>
    <button v-on:click="select('mapQuiz')">Map Quiz</button>
    <button v-on:click="select('capitalQuiz')">Capital Quiz</button>
    <button v-on:click="select('flagQuiz')">Flag Quiz</button>

    <div v-if="selectedElement === 'mapQuiz'">
      <h2>Map Quiz</h2>

      <button v-on:click="selectChart('heatmap')">Heatmap</button>
      <button v-on:click="selectChart('table')">Top 10 Table</button>

      <div v-if="chartSelect === 'table'">
        <h3>Accuracy Table</h3>
        <map-chart v-if="mapMostInaccurate"
        :mapMostAccurate="mapMostAccurate"
        :mapMostInaccurate="mapMostInaccurate" />
      </div>

      <div v-if="chartSelect === 'heatmap'">
        <h3>Accuracy Heatmap</h3>
        <heat-map v-if="mapPerformanceAccuracy"
        :mapPerformanceAccuracy="mapPerformanceAccuracyOnly" />
      </div>
    </div>

    <div v-if="selectedElement === 'capitalQuiz'">
      <h3>Capital Quiz: Accuracy Table</h3>
      <!-- <capital-chart v-if="capitalMostInaccurate"
      :mostAccurate="capitalMostAccurate"
      :mostInaccurate="capitalMostInaccurate" /> -->
    </div>

    <div v-if="selectedElement === 'flagQuiz'">
      <h3>Flag Quiz: Accuracy Table</h3>
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
    this.mapMostAccurate = this.getTopTenAccurate(this.capitalPerformanceAccuracy,
      'capital_correct_ans','capital_wrong_ans', 'capital_accuracy', true )
    // gets 10 countries where the user has performed the worst
    this.mapMostInaccurate = this.getTopTenAccurate(this.capitalPerformanceAccuracy,
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
      const newArray = []
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
      const accuracyArray = []
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

.chart{
  height: 600px;
  font-size: 10px;
}
</style>
