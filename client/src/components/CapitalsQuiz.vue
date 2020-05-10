<template lang="html">

<div>
  <button @click="generateQuestion" type="button" v-if="answerCountry === null">Click to begin!</button>

  <div v-if="answerCountry">
    <!-- <button @click="getPossibleAnswers">Do it</button> -->
    <h2>What is the capital of {{this.answerCountry.name}}?</h2>
    <p v-if="possibleAnswers">
      <button v-on:click="checkGuess(possibleAnswers[0])">{{possibleAnswers[0]}}</button>
      <button v-on:click="checkGuess(possibleAnswers[1])">{{possibleAnswers[1]}}</button>
      <button v-on:click="checkGuess(possibleAnswers[2])">{{possibleAnswers[2]}}</button>
      <button v-on:click="checkGuess(possibleAnswers[3])">{{possibleAnswers[3]}}</button>
    </p>
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
export default {
  data(){
    return {
      answerCountry: null,

      userGuessResult: null,
      possibleAnswers: []
    }
  },
  props: ['countries'],
  methods: {
    getRandomCountry(){
      this.userGuessResult = null;
      const max = this.countries.length;
      let randomIndex = Math.floor(Math.random() * Math.floor(max));
      while (!this.countries[randomIndex].capital){
        randomIndex = Math.floor(Math.random() * Math.floor(max));
      }
      return this.countries[randomIndex];
    },
    checkGuess(guess){
      const correctCapital = this.answerCountry.capital;
      if (guess === correctCapital){
          this.userGuessResult = true;
      }else{
          this.userGuessResult = false;
      }
    },
    getPossibleAnswers(){
      this.possibleAnswers = [];
      this.answerCountry = this.getRandomCountry();
      let wrongAnswer1 = this.getRandomCountry().capital;
      let wrongAnswer2 = this.getRandomCountry().capital;
      let wrongAnswer3 = this.getRandomCountry().capital;
      this.possibleAnswers.push(this.answerCountry.capital, wrongAnswer1, wrongAnswer2, wrongAnswer3);
      for (let i = this.possibleAnswers.length - 1; i > 0; i --){
        const newPos = Math.floor(Math.random() * (i + 1))
        const temp = this.possibleAnswers[i];
        this.possibleAnswers[i] = this.possibleAnswers[newPos];
        this.possibleAnswers[newPos] = temp;
      }
      return this.possibleAnswers
    },
    generateQuestion(){
      this.getRandomCountry();
      this.getPossibleAnswers();
    }
  }
}
</script>

<style lang="css" scoped>
</style>

<!-- checkGuess(){
  const correctCapital = this.answerCountry.capital;
  if (this.userGuess === correctCapital){
      this.userGuessResult = true;
  }else{
      this.userGuessResult = false;
  }
    this.userGuess = ""
  return this.userGuessResult;
  } -->
