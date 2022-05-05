<template>
  <div class="personDetail">


    pid={{pid}}
  </div>
</template>

<script>
export default {
  props: {
    pid: {
      type: Number,
      default: 0
    }
  },
  name: "personDetail",

}
</script>

<style scoped>
.personDetail{

}
</style>