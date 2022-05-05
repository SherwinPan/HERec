<template>
  <div class="searchMovie">
    <el-row v-if="movieNum==0">
      <el-col :span="12" :offset="3">
        无查询结果
      </el-col>
    </el-row>
    <el-row style="margin-top: 4em">
      <el-col :span="15" :offset="3">
        <el-collapse accordion>

          <el-collapse-item v-for="(m,index) in this.movieList" :key="index">
            <template slot="title">
              <p @click="jumpMovieDetail(m.movieId)">{{m.movieName}}</p>
            </template>
            <div>上映日期：{{m.movieRelDate}}</div>
            <div>语言：{{m.movieLang}}</div>
            <div>制片国家/地区：{{m.movieRegion}}</div>
            <div>时长：{{m.movieTime}}</div>
          </el-collapse-item>

        </el-collapse>


        <el-pagination
            background
            :current-page.sync="curPage"
            layout="prev, pager, next"
            :total="this.movieNum"
            @current-change="searchMovie"
        >
        </el-pagination>
      </el-col>

    </el-row>

  </div>
</template>

<script>
export default {
  name: "searchMovie",
  props: {
    mName: {
      type: String,
      default: '',
    },
  },
  data(){
    return{
      movieNum:0,
      movieList:[],
      curPage: 1,
      activeName:'1',
    };
  },
  methods:{
    searchMovie(){
      this.$axios({
        method:"get",
        url:'/searchMovie',
        params:{
          mName:this.mName,
          curPage:this.curPage
        }
      }).then(res=>{
        if(res.data.result){
            this.movieNum=res.data.movieNum;
            this.movieList=res.data.movieList;
        }else{
            this.movieNum=0;
        }
      })
    },
    jumpMovieDetail(mid){
      // console.log("jump")
      this.$router.push({name:'movieDetail',params:{mid:parseInt(mid)}});
    },
  },
  created() {
    this.searchMovie()
  },
  watch:{
    mName:function (){
      location.reload()
    }
  }
}
</script>

<style scoped>

</style>