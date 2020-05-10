<template lang="html">

<div>
  <button @click="generateQuestion" type="button" v-if="answerCountry === null">Click to begin!</button>

  <div v-if="answerCountry">
    <h2>What is the capital of {{this.answerCountry.name}}?</h2>
    <div v-if="possibleAnswers">
      <button v-on:click="checkGuess(possibleAnswers[0])">{{possibleAnswers[0]}}</button>
      <button v-on:click="checkGuess(possibleAnswers[1])">{{possibleAnswers[1]}}</button>
      <button v-on:click="checkGuess(possibleAnswers[2])">{{possibleAnswers[2]}}</button>
      <button v-on:click="checkGuess(possibleAnswers[3])">{{possibleAnswers[3]}}</button>
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

      // getRandomCountry() will calculate a random index and then return a
      // country from the Countries array at that index if that country has a
      // capital. It will also reset the user's guess each time it is called.

    },

    generateQuestion(){
      this.possibleAnswers = [];
      this.answerCountry = this.getRandomCountry();
      this.possibleAnswers.push(this.answerCountry.capital);
      for (let i = this.possibleAnswers.length; i < 4; i ++){
        let answer = this.getRandomCountry().capital;
        if (!this.possibleAnswers.includes(answer)){
          this.possibleAnswers.push(answer)
        }
      }
      this.shuffleArray()
    },

    // getPossibleAnswers() uses getRandomCountry() to create a new array of
    // multiple choice options (this.possibleAnswers). It also sets the correct
    // answer country to a random country. The for loop generated answers for
    // the multiple choice options, providing that they do not already exist
    // within the array. These are then shuffled.

    shuffleArray(){
      for (let i = this.possibleAnswers.length - 1; i > 0; i --){
        const newPos = Math.floor(Math.random() * (i + 1))
        const temp = this.possibleAnswers[i];
        this.possibleAnswers[i] = this.possibleAnswers[newPos];
        this.possibleAnswers[newPos] = temp;
      }
      return this.possibleAnswers
    },

    // shuffleArray() randomises the indexes of the array, so that the correct
    // answer isn't always at the (default) first index.


    checkGuess(guess){
      const correctCapital = this.answerCountry.capital;
      if (guess === correctCapital){
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
</style>
