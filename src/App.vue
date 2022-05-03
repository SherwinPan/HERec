<template>
  <div id="app">
    <el-backtop></el-backtop>
    <el-container>
      <el-header style="height: 80px;">
        <headerback></headerback>
      </el-header>
      <el-main><!-- :style="{ height: clientHeight + 'px' }" -->
        <router-view/>
      </el-main>

    </el-container>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import headerback from './components/headerBack.vue'
import axios from'axios'
export default {
  name: 'app',
  components: {
    HelloWorld,
    headerback
  },
  data(){
    return{
    }
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        this.$nextTick(
            function (){
              console.log('挂载成功! 浏览器宽度为：' + document.documentElement.clientWidth)
              let webBody= document.getElementsByTagName('body')[0]
              webBody.setAttribute('style','width:'+document.documentElement.clientWidth+'px')
            }
        )

      })()
    };

  },
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  min-width: 960px;
  /* margin-top: 60px; */
}

body {
  height: 100vh;
  width: 98.3vw;
  text-decoration: none;
  margin: 0;
}
</style>
<style scoped>
#headimg {
  padding: 30px;
}


.el-header {
  padding: 0px;
  /* height: 80px; */
  line-height: 80px;
  position: fixed;
  width: 100%;
  z-index: 10;
  overflow: visible;
}

.el-main {
  margin-top: 80px;
  padding: 0px;

}
</style>
