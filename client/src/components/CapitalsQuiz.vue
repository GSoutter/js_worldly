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

  <p class="wrongAnswer" v-if="userGuessResult === false">Bad luck, try again!
  <br>
  <button class="wrongAnswerButton" @click="generateQuestion" type="button">I want a new country please!</button></p>

  <div class="rightAnswer" v-if="this.userGuessResult === true">
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
import CountriesService from '@/services/CountriesService.js';
import {eventBus} from '@/main.js'

export default {
  data(){
    return {
      userGuessResult: null,
    }
  },
  props: ['answerCountry', 'possibleAnswers'],
  mounted() {
    this.generateQuestion()
  },
  methods: {
    generateQuestion(){
      this.userGuessResult = null;
      eventBus.$emit('play-quiz');
    },
    checkGuess(guess){
      if (guess === this.answerCountry){
        this.answerCountry.capital_correct_ans += 1
        console.log(this.answerCountry.name, "correct: ",this.answerCountry.capital_correct_ans);

        const id = this.answerCountry._id
        const updatedObject = {
          capital_correct_ans: this.answerCountry.capital_correct_ans
        }
        this.updateCountry(id, updatedObject)

        return this.userGuessResult = true;
      }else{
        this.answerCountry.capital_wrong_ans += 1
        console.log(this.answerCountry.name, "incorrect: ",this.answerCountry.capital_wrong_ans);

        const id = this.answerCountry._id
        const updatedObject = {
          capital_wrong_ans: this.answerCountry.capital_wrong_ans
        }
        this.updateCountry(id, updatedObject)

        return this.userGuessResult = false;
      }
    },
    updateCountry(id, updatedObject){
      CountriesService.updateCountry(id, updatedObject)
      .then(resCountryItem => eventBus.$emit('updated-country-track-item', resCountryItem))
    }
    // checkGuess() will compare the correct country's capital to the user's
    // guess. The result is used to conditionally render feedback to the user
    // in the html.
  }
}

</script>

<style lang="css" scoped>

h1 {
  text-align: center;
  margin-top: 10px;
}

img {
  width: 200px;
  border: 1px black solid;
}

.rightAnswer {
  text-align: center;
}

.wrongAnswer {
  text-align: center;
}

.wrongAnswerButton {
  background-color: #b56576;
  border: none;
}

.question {
  text-align: center;
}

button {
  background-color: #008CBA;
  border: none;
  outline: 0;
  color: white;
  border-radius: 10px;
  border: 2px solid #008CBA;
  padding: 1px 10px;
  margin-bottom: 1px;
  margin-top: 10px;
  width: 250px;
  height: 40px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  transition-duration: 0.4s;
}

button:hover {
  background-color: white;
  color: #008CBA;
}

</style>
