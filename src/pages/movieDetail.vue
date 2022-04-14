<template>
  <div class="movieDetail">
    mid={{mid}}
  </div>
</template>

<script>
export default {
  props:{
    mid: {
      type: Number,
      default: 0
    }
  },
  name: "movieDetail"
}
</script>

<style scoped>
.movieDetail{

}
</style>