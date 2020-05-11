<template lang="html">
  <div>
    <p>This is the flag quiz item</p>
    <img v-bind:src="this.country.flag" alt="Flag">

    <form v-on:submit.prevent>
      <label for="answer">Enter Answer: </label>
      <input type="text" v-model="userAnswer">
      <button type="submit" >Check</button>
    </form>
  </div>

</template>

<script>
export default {
  name: 'flag-quiz-item',
  data(){
    return {
      userAnswer: null
    }
  },
  props: ['country'],
}
</script>

<style lang="css" scoped>
img {
  width: 250px;
  border: solid 1px black;
}
</style>

<!-- <template lang="html">
  <div>
    <h3>This is the flag quiz</h3>
    <button type="button" v-on:click="getRandomCountry" name="button">Get random country</button>
    <flag-quiz-item :country="this.answerCountry" v-if="answerCountry"></flag-quiz-item>
  </div>
</template>

<script>

import FlagQuizItem from './FlagQuizItem.vue'

export default {
  name: 'quiz',
  data(){
    return {
      answerCountry: null,
      multipleChoice: []
    }
  },
  methods: {
    getRandomCountry(){
      const max = this.countries.length;
      const randomIndex = Math.floor(Math.random() * Math.floor(max));
      return this.answerCountry = this.countries[randomIndex];
    }
  },
  props: ['countries'],
  components: {
    'flag-quiz-item': FlagQuizItem
  }
}
</script>

<style lang="css" scoped>
</style> -->
