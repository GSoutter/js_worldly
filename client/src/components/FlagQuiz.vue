<template lang="html">
  <div>
    <h3>This is the flag quiz</h3>
    <button type="button" v-on:click="getRandomCountry" name="button">Get random country</button>
    <flag-quiz-item :country="this.randomCountry"></flag-quiz-item>

  </div>
</template>

<script>

import FlagQuizItem from './FlagQuizItem.vue'

export default {
  name: 'flag-quiz',
  data(){
    return {
      randomCountry: null
    }
  },
  methods: {
    getRandomCountry(){
      const max = this.countries.length;
      const randomIndex = Math.floor(Math.random() * Math.floor(max));
      return this.randomCountry = this.countries[randomIndex];
    }
  },
  props: ['countries'],
  components: {
    'flag-quiz-item': FlagQuizItem
  }
}
</script>

<style lang="css" scoped>
</style>
