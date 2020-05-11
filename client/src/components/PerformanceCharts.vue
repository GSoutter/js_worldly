<template lang="html">
  <div class="">
    <h3>Hello</h3>
    <map-chart v-if="mapMostInaccurate" :mapMostAccurate="mapMostAccurate" :mapMostInaccurate="mapMostInaccurate" />
  </div>
</template>

<script>
import MapChart from '@/components/charts/MapChart.vue'

export default {
  name: "performance-charts",
  props: ['countries', 'mapPerformance'],
  data(){
    return{
      mapPerformanceAccuracy: [],
      mapMostAccurate: [],
      mapMostInaccurate: [],
    }
  },
  mounted() {
    // calculates accuracy of guesses
    this.mapPerformanceAccuracy = this.getAccuracy(this.mapPerformance, 'correct_answers','wrong_answers', 'map_accuracy' )
    // gets 10 countries where the user has performed the best
    this.mapMostAccurate = this.getTopTenAccurate(this.mapPerformanceAccuracy, 'correct_answers','wrong_answers', 'map_accuracy', true )
    // gets 10 countries where the user has performed the worst
    this.mapMostInaccurate = this.getTopTenAccurate(this.mapPerformanceAccuracy, 'correct_answers','wrong_answers', 'map_accuracy', false )


  }, // mounted end

  methods: {
    getAccuracy: function(array, rightKey, wrongKey, fieldName){
      // loops through array, calculating guess accuracy and adding to object.
      for (let country of array) {
        country[fieldName] = (country[rightKey] / (country[wrongKey] + country[rightKey]))*100
      }
      return array
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
        if ((totalAnswers > 20)) {
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
    'map-chart': MapChart
  }
}
</script>

<style lang="css" scoped>

.chart{
  height: 600px;
  font-size: 10px;
}
</style>
