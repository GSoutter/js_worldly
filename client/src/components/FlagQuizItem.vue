<template lang="html">
  <div>
    <p>This is the flag quiz item</p>
    <img v-bind:src="this.country.flag" alt="Flag">

    <form v-on:submit.prevent>
      <label for="answer">Enter Answer: </label>
      <input type="text" v-model="userAnswer">
      <button type="submit" >Check</button>
    </form>
  </div>

</template>

<script>
export default {
  name: 'flag-quiz-item',
  data(){
    return {
      userAnswer: null
    }
  },
  props: ['country'],
}
</script>

<style lang="css" scoped>
img {
  width: 250px;
  border: solid 1px black;
}
</style>
