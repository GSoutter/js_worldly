<template lang="html">

<div>
<!-- <li v-for="country in countries">{{country.name}}  {{country.capital}}</li> -->
<button @click="getRandomCountry" type="button" v-if="randomCountry === null">Click to begin!</button>

  <div v-if="randomCountry">
  <h2>What is the capital of {{this.randomCountry.name}}?</h2>
  <input v-model="userGuess" v-on:keyup.enter="checkGuess">
  <!-- <input v-model="userGuess">
  <button v-on:click="checkGuess">Guess</button> -->
  <p v-if="this.userGuessResult === false">Bad luck, try again!
  <br>
  <button @click="getRandomCountry" type="button">I want a new country please!</button></p>

    <div v-if="this.userGuessResult === true">
      <p>Well done!</p>
      <p><img :src="this.randomCountry.flag" width="150" height="100"></p>
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
      userGuessResult: null
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
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
