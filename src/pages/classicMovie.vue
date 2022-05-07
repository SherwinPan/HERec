<template>
<div class="classicMovie">
  <el-row>
    <el-col :span="15" :offset="3">
      <el-table :data="movieList" style=" width: auto;">
        <el-table-column type="expand">
          <template v-slot="props">
            <el-row>
              <el-col :span="10" :offset="2">
                <div id="movieInfo">
                  <el-descriptions class="margin-top" title="" :column="1">
                    <el-descriptions-item label="导演">
                      <div v-for="d in props.row.director" @click="jumpPersonDetail(d.directorIdOld)">
                        {{d.personName}}
                      </div>
                    </el-descriptions-item>
                    <el-descriptions-item label="主演">
                      <div v-for="a in props.row.actor" @click="jumpPersonDetail(a.actorIdOld)">
                        {{a.personName}}
                      </div>
                    </el-descriptions-item>
                    <el-descriptions-item label="类型">
                      <el-tag size="small" v-for="t in props.row.type">{{t}}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="语言">{{ props.row.movieLang }}</el-descriptions-item>
                    <el-descriptions-item label="电影时长">{{ props.row.movieTime }}</el-descriptions-item>
                    <el-descriptions-item label="电影上映日期">{{ props.row.movieRelDate }}</el-descriptions-item>
                  </el-descriptions>
                </div>
              </el-col>
              <el-col :span="8" :offset="2">
                <el-image lazy style="height: 15em"
                          :src="'http://127.0.0.1:8000/media/'+props.row.movieImg" class="carouselImg" :fit="'scale-down'" @click="jumpMovieDetail(props.row.movieId)"></el-image>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20" :offset="2">
                <div>
                  <el-descriptions class="margin-top" title="" :column="1">
                    <el-descriptions-item label="电影简介">{{ props.row.movieBio }}</el-descriptions-item>
                  </el-descriptions>
                </div>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="movieName" label="电影名"width="600"></el-table-column>
        <el-table-column prop="score" label="电影评分"width="80"></el-table-column>
      </el-table>
      <el-pagination
          background
          :current-page.sync="curPage"
          layout="prev, pager, next"
          :total="this.numOfMovie"
          @current-change="getTopMovie"
      >
      </el-pagination>
    </el-col>
  </el-row>





</div>
</template>

<script>
export default {
  name: "classicMovie",
  data(){
    return{
      movieList:[],
      numOfMovie:0,
      curPage:1,
    };
  },
  methods:{
    getTopMovie(){
      // let id=this.$cookie.get('userId');
      this.$axios({
        method:"get",
        url:'/getTopMovie',
        params:{
          curPage:this.curPage,
        }
      }).then(res=>{
        if(res.data.numOfMovie >0){
          this.numOfMovie= res.data.numOfMovie
          this.movieList= res.data.movieList
        }else{
          this.numOfRate=0
        }
      })
    },



    jumpPersonDetail(pid){
      // console.log("jump")
      this.$router.push({name:'personDetail',params:{pid:parseInt(pid)}});
    },
    jumpMovieDetail(mid){
      // console.log("jump")
      this.$router.push({name:'movieDetail',params:{mid:parseInt(mid)}});
    },
  },
  created() {
    this.getTopMovie()
  }
}
</script>

<style scoped>

</style>