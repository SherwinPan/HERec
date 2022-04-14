<template>
  <div id="rec">
    <div class="block">
      <!--        轮播slide-->
      <el-carousel height="400px" style="display: block" >
        <el-carousel-item v-for="item in 4" :key="item" @click="jumpMovieDetail({item})" >
          <el-image :src="require('../assets/HERec.png')" class="carouselImg" :fit="'cover'" @click="jumpMovieDetail(item)"></el-image>
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>

      <div id="recentMovie">
        <div class="spanTitle">
          上新热门
        </div>
        <div class="spanContent">
          <router-link :to="{name:'movieDetail',params:{mid:item}}" v-for="item in 6" :key="item">
            <el-image class="spanContentImg"
                      style="margin: 20px 0px 0px 20px;border-radius: 4px;height: 9em;" :src="src" :fit="'cover'">
            </el-image>
            <p style="text-align: center;margin: 0px">{{ item }}</p>
          </router-link>
        </div>
      </div>

      <div id="classicMovie">
        <div class="spanTitle">
          经典排行
        </div>
        <div class="spanContent">
          <div v-for="item in 6" :key="item">
            <el-image class="spanContentImg"
                      style="margin: 20px 0px 0px 20px;border-radius: 4px;height: 9em;" :src="src" :fit="'cover'">
            </el-image>
            <p style="text-align: center;margin: 0px">{{ item }}</p>
          </div>
        </div>
      </div>

      <div id="recMovie">
        <div class="spanTitle">
          猜你喜欢
        </div>
          <ul class="infinite-list" v-infinite-scroll="load1" >
            <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
          </ul>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'rec',
  data() {
    return {
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      count: 0,
    }
  },
  methods:{
	  jumpMovieDetail(mid){
      console.log("jump")
		  this.$router.push({name:'movieDetail',params:{mid:mid}});
	  },
    load () {
      this.count += 2
    },
  }
}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 2em;
  opacity: 0.75;
  line-height: 4em;
  margin: 0;
  position: relative;
  bottom: 4em;

  text-align: center;
}
.el-carousel{
  /*width: 1060px !important;*/
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;

}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.carouselImg{
  height: 100%;
  width: 100%;
}
#recentMovie {
  margin-top: 2em;
}
#classicMovie {
  margin-top: 2em;
}

.spanTitle {
  margin-left: 2em;
  font-size: 1.8em;
  font-weight: bold;

}

.spanContent {
  margin-left: 2em;
  margin-right: 2em;
  margin-bottom: 3em;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.spanContentImg {
  /*transition: all 1.3s ease;*/
  /*transition: all linear 2s*/
}

.spanContentImg :hover {
  transform: scale(1.2);
}
#recMovie{
  margin-top: 2em;
  overflow: hidden;
}
.infinite-list {
  height: 3000px;
  padding: 0;
  margin: 2em;
  list-style: none;

}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20em;
  background: #e8f3fe;
  margin-bottom: 1em;
  color: #7dbcfc;
}
</style>
