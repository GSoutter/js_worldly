<template lang="html">

<div>
  <h1>Capitals Quiz</h1>

  <div class="question" v-if="answerCountry && !userGuessResult">
    <p>What is the capital of {{this.answerCountry.name}}?</p>
    <br>
    <div v-if="possibleAnswers">
      <button v-on:click="checkGuess(possibleAnswers[0])">{{possibleAnswers[0].capital}}</button>
      <br>
      <button v-on:click="checkGuess(possibleAnswers[1])">{{possibleAnswers[1].capital}}</button>
      <br>
      <button v-on:click="checkGuess(possibleAnswers[2])">{{possibleAnswers[2].capital}}</button>
      <br>
      <button v-on:click="checkGuess(possibleAnswers[3])">{{possibleAnswers[3].capital}}</button>
    </div>
  </div>

  <p v-if="userGuessResult === false">Bad luck, try again!
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
    // checkGuess() will compare the correct country's capital to the user's
    // guess. The result is used to conditionally render feedback to the user
    // in the html.
  }
}

</script>

<style lang="css" scoped>

h1 {
  align-self: flex-end;
  margin-top: 10px;
}

.question {
  display: grid;
  justify-content: flex-start;
}

button{
  background-color: pink;
  height: 30px;
  margin: 5px;
  font-size: 20px;
}

button:hover {
  background-color: white;
  color: #008CBA;
}

</style>
