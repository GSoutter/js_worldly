<template lang="html">
  <div>
    <p>This is the flag quiz item</p>
    <img v-bind:src="this.country.flag" alt="Flag">
  </div>

</template>

<script>
export default {
  name: 'flag-quiz-item',
  props: ['country'],
}
</script>

<style lang="css" scoped>
img {
  width: 250px;
  border: solid 1px black;
}
</style>
