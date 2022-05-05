<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="personDetail">
    <el-row>
      <el-col :span="12" :offset="3">
        <div id="movieTitle">
          <h1>{{this.personInfo.personName}}</h1>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="3">
        <div id="personImg" style="background: #2c3e50" >
          <el-image :src="require('../assets/logo.png')" :fit="'cover'"></el-image>
        </div>
      </el-col>
      <el-col :span="7" :offset="1">
        <div id=" ">
          <el-descriptions class="margin-top" title="" :column="1">
            <el-descriptions-item label="性别" label-class-name="movieDirector">
              {{this.personInfo.personGender}}
            </el-descriptions-item>
            <el-descriptions-item label="生日" label-class-name="movieActor">
              {{this.personInfo.personBirth}}
            </el-descriptions-item>
            <el-descriptions-item label="出生地" label-class-name="movieDirector">
              {{this.personInfo.personPlace}}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="3" :span="15">
        <h4>影人简介</h4>
        {{this.personInfo.personBio}}
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="3" :span="15" >
        <h2 v-if="this.isDirect" style="color: #007722">指导电影</h2>
        <el-table v-if="this.isDirect" :data="directMovieList" style=" width: auto;">
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
                  <el-image :src="require('../assets/HERec.png')" class="carouselImg" :fit="'cover'" @click="jumpMovieDetail(props.row.movieId)"></el-image>
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
        <h2 v-if="this.isActor" style="color: #007722;margin-top: 1em">参演电影</h2>
        <el-table v-if="this.isActor" :data="actorMovieList" style=" width: auto;">
          <el-table-column type="expand">
            <template v-slot="props">
              <el-row>
                <el-col :span="10" :offset="2">
                  <div id="">
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
                  <el-image :src="require('../assets/HERec.png')" class="carouselImg" :fit="'cover'" @click="jumpMovieDetail(props.row.movieId)"></el-image>
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
      </el-col>
    </el-row>



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
  data(){
    return{
      personInfo:{
        personId:0,
        personName:'',
        personBirth:'',
        personPlace:'',
        personGender:'',
        personImg:'',
        personBio:'',
      },
      isDirect:false,
      directMovieList:[],
      isActor:false,
      actorMovieList:[],
    };
  },
  methods:{
    getPersonInfo(){
      this.$axios({
        method:"get",
        url:"/getPersonByPersonId",
        params:{
          pid:this.pid,
        }
      }).then(res=>{
        if (res.data.result){
          this.personInfo.personName=res.data.personInfo.personName
          this.personInfo.personBirth=res.data.personInfo.personBirth
          this.personInfo.personPlace=res.data.personInfo.personPlace
          this.personInfo.personGender=res.data.personInfo.personGender
          this.personInfo.personImg=res.data.personInfo.personImg
          this.personInfo.personBio=res.data.personInfo.personBio
          this.personInfo.personId=res.data.personInfo.personId
          // this.movieList=res.data.movieList
        }else{
          this.$message.error('无此影人404');
          this.$router.go(-1);
        }
      })
    },
    //指导电影列表获取，同时获取得分
    //参演电影列表获取
    getDirectMovieListByPid(){
      this.$axios({
        method:"get",
        url:'/getDirectMovieListByPid',
        params:{
          pid:this.pid
        }
      }).then(res=>{
        if(res.data.result){
          this.isDirect=true
          this.directMovieList=res.data.movieList
        }else{
          this.isDirect=false
        }
      })
    },
    getActMovieListByPid(){
      this.$axios({
        method:"get",
        url:'/getActMovieListByPid',
        params:{
          pid:this.pid
        }
      }).then(res=>{
        if(res.data.result){
          this.isActor=true
          this.actorMovieList=res.data.movieList
        }else{
          this.isDirect=false
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
    this.getPersonInfo()
    this.getDirectMovieListByPid()
    this.getActMovieListByPid()
  },
  watch:{
    pid:function (newval,oldval){
      location.reload()
    },
  }
}
</script>

<style scoped>
.personDetail{

}
</style>