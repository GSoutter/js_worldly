<template lang="html">
  <div class="">
    <h3>Admin for Backend</h3>
    <p>Countries from RestAPI: {{countries.length}}</p>
    <p>Countries in Outline map tracking: {{mapPerformance.length}}</p>
  </div>
</template>

<script>
export default {
  name: 'admin-backend',
  props: ['countries', 'mapPerformance']
}
</script>

<style lang="css" scoped>
</style>
