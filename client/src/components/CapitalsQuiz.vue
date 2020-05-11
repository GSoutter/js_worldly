<template lang="html">

<div>
  <button @click="generateQuestion" type="button" v-if="answerCountry === null">Click to begin!</button>

  <div v-if="answerCountry">
    <h2>What is the capital of {{this.answerCountry.name}}?</h2>
    <div v-if="possibleAnswers">
      <button v-on:click="checkGuess(possibleAnswers[0])">{{possibleAnswers[0].capital}}</button>
      <button v-on:click="checkGuess(possibleAnswers[1])">{{possibleAnswers[1].capital}}</button>
      <button v-on:click="checkGuess(possibleAnswers[2])">{{possibleAnswers[2].capital}}</button>
      <button v-on:click="checkGuess(possibleAnswers[3])">{{possibleAnswers[3].capital}}</button>
    </div>
  </div>

  <p v-if="this.userGuessResult === false">Bad luck, try again!
  <br>
  <button @click="generateQuestion" type="button">I want a new country please!</button></p>

  <div v-if="this.userGuessResult === true">
    <p>Well done!</p>
    <p><img :src="this.answerCountry.flag" width="150"></p>
    <p>The capital of {{this.answerCountry.name}} is {{this.answerCountry.capital}}!</p>
    <p>People from {{this.answerCountry.name}} are called {{this.answerCountry.demonym}}.</p>
    <p>{{this.answerCountry.name}} is part of {{this.answerCountry.region}}.</p>
    <p><button @click="generateQuestion" type="button">Next!</button></p>
  </div>

</div>

</template>

<script>

import {eventBus} from '@/main.js'
export default {
  data(){
    return {
      userGuessResult: null,
    }
  },
  props: ['answerCountry', 'possibleAnswers'],
  methods: {
    generateQuestion(){
      this.userGuessResult = null;
      eventBus.$emit('play-quiz');
    },
    checkGuess(guess){
      if (guess === this.answerCountry){
          this.userGuessResult = true;
      }else{
          this.userGuessResult = false;
      }
    },
  }
}

</script>

<style lang="css" scoped>
</style>
