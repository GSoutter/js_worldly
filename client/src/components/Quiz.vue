<template lang="html">
  <div class="quiz">
    <capitals-quiz v-if="selectedElement === 'capitalQuiz'" :answerCountry="this.answerCountry" :possibleAnswers="this.possibleAnswers"></capitals-quiz>
    <flag-quiz v-if="selectedElement === 'flagQuiz'" :answerCountry="this.answerCountry" :possibleAnswers="this.possibleAnswers"></flag-quiz>
  </div>
</template>

<script>
import FlagQuiz from './FlagQuiz.vue'
import CapitalsQuiz from './CapitalsQuiz.vue'
import {eventBus} from '@/main.js'
export default {
  data(){
    return {
      answerCountry: null,
      userGuessResult: null,
      possibleAnswers: []
    }
  },
  props: ['countries', 'selectedElement'],
  watch: {
    selectedElement: function(){
      this.generateQuestion();
    }
  },
  mounted() {
    eventBus.$on('guess-selected', (payload) => {
      this.checkGuess(payload);
    });

    eventBus.$on('play-quiz', () => {
      this.generateQuestion();
    })
  },
  components: {
    'capitals-quiz': CapitalsQuiz,
    'flag-quiz': FlagQuiz
  },
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
      this.possibleAnswers.push(this.answerCountry);
      for (let i = this.possibleAnswers.length; i < 4; i ++){
        let answer = this.getRandomCountry();
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

  }
}

</script>

<style lang="css" scoped>

.quiz {
  background: RGBA(245, 239, 203, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 800px;
  font-size: 24px;
}

</style>
