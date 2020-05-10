<template lang="html">

<div>
<button @click="getRandomCountry" type="button" v-if="randomCountry === null">Click to begin!</button>

  <div v-if="randomCountry">
    <button @click="getPossibleAnswers">Do it</button>
  <h2>What is the capital of {{this.randomCountry.name}}?</h2>
  <input v-model="userGuess" v-on:keyup.enter="checkGuess">
  <p><div v-for="possibleAnswer in possibleAnswers">
    <input type="radio" v-model="userGuess" v-on:change="checkGuess" name="user_guess">{{possibleAnswer}}</button></p>
    </div>
  <p v-if="this.userGuessResult === false">Bad luck, try again!
  <br>
  <button @click="getRandomCountry" type="button">I want a new country please!</button></p>

    <div v-if="this.userGuessResult === true">
      <p>Well done!</p>
      <p><img :src="this.randomCountry.flag" width="150"></p>
      <p>The capital of {{this.randomCountry.name}} is {{this.randomCountry.capital}}!</p>
      <p>People from {{this.randomCountry.name}} are called {{this.randomCountry.demonym}}.</p>
      <p>{{this.randomCountry.name}} is part of {{this.randomCountry.region}}.</p>
      <p><button @click="getRandomCountry" type="button">Next!</button></p>
    </div>

  </div>

</div>


</template>

<script>
export default {
  data(){
    return {
      randomCountry: null,
      userGuess: "",
      userGuessResult: null,
      possibleAnswers: []
    }
  },
  props: ['countries'],
  methods: {
    getRandomCountry(){
      this.userGuessResult = null;
      const max = this.countries.length;
      const randomIndex = Math.floor(Math.random() * Math.floor(max));
      return this.randomCountry = this.countries[randomIndex];
    },
    checkGuess(){
      const correctCapital = this.randomCountry.capital;
      if (this.userGuess === correctCapital){
          this.userGuessResult = true;
      }else{
          this.userGuessResult = false;
      }
        this.userGuess = ""
      return this.userGuessResult;
    },
    getPossibleAnswers(){
      this.possibleAnswers.push(this.randomCountry.capital);
      const max = this.countries.length;
      let randomIndex1 = Math.floor(Math.random() * Math.floor(max));
      let wrongCountry1 = this.countries[randomIndex1];
      let wrongAnswer1 = wrongCountry1.capital;
      let randomIndex2 = Math.floor(Math.random() * Math.floor(max));
      let wrongCountry2 = this.countries[randomIndex2];
      let wrongAnswer2 = wrongCountry2.capital;
      let randomIndex3 = Math.floor(Math.random() * Math.floor(max));
      let wrongCountry3 = this.countries[randomIndex3];
      let wrongAnswer3 = wrongCountry3.capital;
      this.possibleAnswers.push(wrongAnswer1, wrongAnswer2, wrongAnswer3);
      return this.possibleAnswers
      console.log(this.possibleAnswers);
    }
  }
}
</script>

<style lang="css" scoped>
</style>

<!-- checkGuess(){
  const correctCapital = this.randomCountry.capital;
  if (this.userGuess === correctCapital){
      this.userGuessResult = true;
  }else{
      this.userGuessResult = false;
  }
    this.userGuess = ""
  return this.userGuessResult;
  } -->
