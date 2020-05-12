<template lang="html">

<div>
  <h3>Flag Quiz</h3>
  <button @click="generateQuestion" type="button" v-if="answerCountry === null">Click to begin!</button>

  <img v-if="answerCountry" v-bind:src="this.answerCountry.flag" alt="Flag">

  <div v-if="answerCountry">
    <h2>What country is this the flag of?</h2>
    <div v-if="possibleAnswers">
      <button v-on:click="checkGuess(possibleAnswers[0])">{{possibleAnswers[0].name}}</button>
      <button v-on:click="checkGuess(possibleAnswers[1])">{{possibleAnswers[1].name}}</button>
      <button v-on:click="checkGuess(possibleAnswers[2])">{{possibleAnswers[2].name}}</button>
      <button v-on:click="checkGuess(possibleAnswers[3])">{{possibleAnswers[3].name}}</button>
    </div>
  </div>

  <p v-if="this.userGuessResult === false">Bad luck, try again!
  <br>
  <button @click="generateQuestion" type="button">I want a new country please!</button></p>

  <div v-if="this.userGuessResult === true">
    <p>Well done!</p>
    <p>The capital of {{this.answerCountry.name}} is {{this.answerCountry.capital}}!</p>
    <p>People from {{this.answerCountry.name}} are called {{this.answerCountry.demonym}}.</p>
    <p>{{this.answerCountry.name}} is part of {{this.answerCountry.region}}.</p>
    <p><button @click="generateQuestion" type="button">Next!</button></p>
  </div>

</div>

</template>

<script>
import CountriesService from '@/services/CountriesService.js';
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
        this.answerCountry.flag_correct_ans += 1
        console.log(this.answerCountry.name, "correct: ",this.answerCountry.flag_correct_ans);

        this.updateCountryFlag(this.answerCountry)

        return this.userGuessResult = true;
      }else{
        this.answerCountry.flag_wrong_ans += 1
        console.log(this.answerCountry.name, "incorrect: ",this.answerCountry.flag_wrong_ans);

        this.updateCountryFlag(this.answerCountry)

        return this.userGuessResult = false;
      }
    },
    updateCountryFlag(country){
      CountriesService.updateCountry(country._id, country)
      .then(resCountryItem => eventBus.$emit('updated-flag-track-item', resCountryItem))
    }
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
</style>
