<template>
  <div class="notFound">
    <el-row>
      <el-col :span="8" :offset="4">
        <el-image :src="require('../assets/404.png')" style="width: 20em;height: 20em"></el-image>
      </el-col>
      <el-col :span="8">
        <h1>
          <P>404</P>
        </h1>
      </el-col>
    </el-row>
    <h3>
      <i class="el-icon-loading"></i>找不到此页面，5秒后跳转...
    </h3>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  components: {},
  mounted() {
    console.log('开始倒计时')
    this.t = setTimeout(() => {
      this.goBack();
    }, 5000);
  },
  beforeDestroy() {
    clearTimeout(this.t);
    console.log("移除倒计时")
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}

</script>

<style scoped>
.notFound {
  margin-top: 10em;
  align-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

h1 p {
  font-size: 500%;
  /*margin-top: 10%;*/
  text-align: center;
}

h3 {
  /*margin-top: 10%;*/
  position: relative;
  text-align: center;

}
</style>