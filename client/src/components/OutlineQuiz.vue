<template lang="html">
  <div class="">
    <h1>Outline Quiz Map</h1>
    <outline-map/>
  </div>
</template>

<script>
import OutlineMap from '@/components/OutlineMap.vue'


export default {
  name: 'outline-quiz',
  components: {
    'outline-map': OutlineMap,
  }
}
</script>

<style lang="css" scoped>
</style>
