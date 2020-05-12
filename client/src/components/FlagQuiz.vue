<template lang="html">

<div>
  <h1>Flag Quiz</h1>

  <img v-if="answerCountry" v-bind:src="this.answerCountry.flag" alt="Flag">

  <div v-if="answerCountry && !userGuessResult">
    <p>What country is this the flag of?</p>
    <div v-if="possibleAnswers">
      <button v-on:click="checkGuess(possibleAnswers[0])">{{possibleAnswers[0].name}}</button>
      <br>
      <button v-on:click="checkGuess(possibleAnswers[1])">{{possibleAnswers[1].name}}</button>
      <br>
      <button v-on:click="checkGuess(possibleAnswers[2])">{{possibleAnswers[2].name}}</button>
      <br>
      <button v-on:click="checkGuess(possibleAnswers[3])">{{possibleAnswers[3].name}}</button>
      <br>
    </div>
  </div>

  <div><p v-if="userGuessResult===false">Bad luck, try again!
  <br>
  <button @click="generateQuestion" type="button">I want a new country please!</button></p>
  </div>

  <div v-if="userGuessResult">
    <p>Well done!</p>
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
    // checkGuess() will compare the correct country's capital to the user's
    // guess. The result is used to conditionally render feedback to the user
    // in the html.
  }
}

</script>

<style lang="css" scoped>
  img {
    width: 200px;
  }
  h1 {
    font-size: 30px;
  }
</style>
