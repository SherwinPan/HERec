<template>
  <div class="movieDetail">
    <el-row>
      <el-col :span="12" :offset="3">
        <div id="movieTitle">
          <h1>{{this.movieName}} </h1>
          <i v-if="$cookie.get('type')==0" class="el-icon-s-tools" @click="modifyMovie(mid)" ></i>
          <el-switch
              v-if="$cookie.get('type')==0"
              style="display: block"
              v-model="movieSlide"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="轮播展示"
              inactive-text="非展示">
          </el-switch>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="3">
        <div id="movieCover" style="background: #2c3e50" >
          <el-image v-if="imgLoad" :src="this.$store.getters.getMediaUrl + movieCover" :fit="'scale-down'"></el-image>
        </div>
      </el-col>
      <el-col :span="7" :offset="1">
        <div id="movieInfo">
          <el-descriptions class="margin-top" title="" :column="1">
            <el-descriptions-item label="导演" label-class-name="movieDirector">
              <div style="cursor: pointer" @click="alert(directorList)">
                <span v-for="d in this.directorList" @click="jumpPersonDetail(d.directorIdOld)">
                  {{d.personName}}/
                </span>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="主演" label-class-name="movieActor">
              <span v-for="d in this.actorList" @click="jumpPersonDetail(d.actorIdOld)">
                {{d.personName}}/
              </span>
            </el-descriptions-item>
            <el-descriptions-item label="类型" label-class-name="movieDirector">
              <el-tag size="small" v-for="t in this.typeList" style="margin-right: 3px">{{ t }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="语言" label-class-name="movieDirector">{{ this.movieLang }}</el-descriptions-item>
            <el-descriptions-item label="电影时长" label-class-name="movieDirector">{{ this.movieTime }}</el-descriptions-item>
            <el-descriptions-item label="制片国家/地区" label-class-name="movieDirector">{{ this.movieRegion }}</el-descriptions-item>
            <el-descriptions-item label="上映时间" label-class-name="movieDirector">{{ this.movieRelDate }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </el-col>
      <el-col :span="1"><br/>
        <el-divider direction="vertical"></el-divider>
      </el-col>
      <el-col :span="4">
        评分
        <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
        </el-rate>
        <table style="width: 13em">
          <tr>
            <td style="width: 2em">1星</td>
            <td>
              <el-progress :percentage="this.percentOneStar" ></el-progress>
            </td>
          </tr>
          <tr>
            <td>2星</td>
            <td>
              <el-progress :percentage="this.percentTwoStar"></el-progress>
            </td>
          </tr>
          <tr>
            <td>3星</td>
            <td>
              <el-progress :percentage="this.percentThreeStar"></el-progress>
            </td>
          </tr>
          <tr>
            <td>4星</td>
            <td>
              <el-progress :percentage="this.percentFourStar"></el-progress>
            </td>
          </tr>
          <tr>
            <td>5星</td>
            <td>
              <el-progress :percentage="this.percentFiveStar"></el-progress>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="3">
        <div ></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="3" :span="15">
        <h4> 我的评价：</h4>
        <el-rate  v-model="userScore" show-text></el-rate>
        <h4>{{this.movieName}}的电影简介</h4>
        {{this.movieBio}}
      </el-col>
    </el-row>

    <el-row style="margin-top: 2em">
      <el-col :offset="3" :span="15">
        <el-form ref="commentForm" :model="commentForm" label-width="80px" size="mini">
          <el-form-item label="我的评论">
            <el-input type="textarea" placeholder="请输入内容" v-model="commentForm.userComment" maxlength="500" show-word-limit style="margin-bottom: 1em">
            </el-input>
          </el-form-item>
          <el-form-item style="text-align: right">
            <el-button type="success" @click="submitComment" size="mini" >评论</el-button>
          </el-form-item>
        </el-form>

        <div style="margin-top: 1em;margin-bottom: 1em">
          <p style="color:#007722; font-size: 14px" >········最热影评········共计{{this.commentNum}}条评论</p>
        </div>

        <div v-for="(c,index) in this.commentList" :key="index"><!--评论模块-->
          <el-row>
            <el-col :span="3" style="font-size: 12px;">
              <span>
                {{c.userName}}
              </span>
            </el-col>
            <el-col :span="5">
                <el-rate v-model="c.score" disabled text-color="#ff9900"></el-rate>
            </el-col>
            <el-col :span="4" :offset="12" style="text-align: right">
              {{c.vote}}
              <i class="el-icon-star-on" v-if="voteStar[index]" style="color:#E6A23C" @click="cancelCommentVote(c.id,$cookie.get('userId'),index)"></i>
              <i class="el-icon-star-off" v-else @click="commentVote(c.id,$cookie.get('userId'),index)" ></i>
            </el-col>
          </el-row>
          <el-row >
            <el-col>
            <span style="font-size: 13px">
              {{c.comment}}
            </span>
            </el-col>
          </el-row>
          <el-divider></el-divider>
        </div>

        <el-pagination
            background
            :current-page.sync="curPage"
            layout="prev, pager, next"
            :total="this.commentNum"
            @current-change="getCommentsByMid"
        >
        </el-pagination>
      </el-col>
    </el-row>





  </div>
</template>

<script>
export default {
  props: {
    mid: {
      type: Number,
      default: 0
    }
  },
  name: "movieDetail",
  data(){
    return{
      imgLoad:false,
      commentForm:{
        userComment:'',
      },
      movieSlide:false,
      movieName:'',//电影名称
      movieBio:'',//电影简介
      movieTime:"",//电影时长
      movieRelDate:"",//电影发布日
      movieLang:"",//电影语言
      movieRegion:"",//电影生产国地区
      movieCover:"",//电影封面
      typeList:[],//电影的类型列表
      actorList:[],//演员列表
      directorList:[],//导演列表，
      value:6,//电影平均分
      percentOneStar:0,//1星打分人数百分比
      percentTwoStar:0,//2星打分人数百分比
      percentThreeStar:0,//3星打分人数百分比
      percentFourStar:0,//4星打分人数百分比
      percentFiveStar:0,//5星打分人数百分比
      userScore:0,//当前用户给电影的打分
      commentNum:0,//评论总数
      commentList:[],//评论列表，userName,uid,comment,vote,score,id
      userText:'',
      curPage:1,//分页的当前页
      voteStar:[0,0,0,0,0,0,0,0,0,0]//评论点赞
    };

  },
  methods:{
    getMovieInfo(){
      let type = this.$cookie.get('type')
      this.$axios({
        method:"get",
        url:"/getMovieByMovieId",
        params:{
          mid:this.mid,
        }
      }).then(res=>{
        if (res.data.result){
          this.movieName=res.data.movieInfo.movieName;
          this.movieBio=res.data.movieInfo.movieBio;
          this.movieLang = res.data.movieInfo.movieLang;
          this.movieTime=res.data.movieInfo.movieTime;
          this.movieRelDate=res.data.movieInfo.movieRelDate;
          this.movieRegion = res.data.movieInfo.movieRegion;
          this.movieCover = res.data.movieInfo.movieImg;
          if (type==0){
            this.movieSlide = res.data.movieInfo.movieSlide;
          }

          this.actorList = res.data.actor;
          this.typeList = res.data.type;
          this.directorList = res.data.director;
          this.imgLoad=true;
        }else{
          this.$message.error('无此电影404');
          this.$router.go(-1);
        }
      })
    },
    getRateByMid(){
      this.$axios({
        method:"get",
        url:'/getRateByMid',
        params:{
          mid:this.mid,
        }
      }).then(res=>{
        if (res.data.result){
          this.value=res.data.avgScore;
          this.percentOneStar=res.data.perList[0];
          this.percentTwoStar=res.data.perList[1];
          this.percentThreeStar=res.data.perList[2];
          this.percentFourStar=res.data.perList[3];
          this.percentFiveStar=res.data.perList[4];
        }else{
          this.value=0;
          this.percentOneStar=0;
          this.percentTwoStar=0;
          this.percentThreeStar=0;
          this.percentFourStar=0;
          this.percentFiveStar=0;
        }
      })
    },
    getCommentsByMid(){
      let hasU = false
      if (this.$cookie.get('userId')){
        hasU = true
      }
      this.$axios({
        method:"get",
        url:'/getCommentsByMid',
        params:{
          mid:this.mid,
          hasUid:hasU,
          uid:this.$cookie.get('userId'),
          curPage:this.curPage,
        }
      }).then(res=>{
        this.commentNum=res.data.commentNum
        this.commentList=res.data.commentList
        this.voteStar=res.data.voteStar
        if (res.data.userComment){
          this.commentForm.userComment=res.data.userComment
        }
      })
    },
    jumpPersonDetail(pid){
      // console.log("jump")
      this.$router.push({name:'personDetail',params:{pid:parseInt(pid)}});
    },
    commentVote(cid,uid,index){
      if (this.$cookie.get('userId')){
        this.$axios({
          method:"get",
          url:'/commentVote',
          params:{
            cid:cid,
            uid:uid,
          }
        }).then(res=>{
          if (res.data.result){
            this.voteStar[index]=1
            this.getCommentsByMid()
          }
        })
      }else{
        this.$message.error('请先登录再操作')
        this.$router.push('/log')
      }
    },
    cancelCommentVote(cid,uid,index){
      if (this.$cookie.get('userId')){
        this.$axios({
          method:"get",
          url:'/cancelCommentVote',
          params:{
            cid:cid,
            uid:uid,
          }
        }).then(res=>{
          if (res.data.result){
            this.voteStar[index]=0
            this.getCommentsByMid()
          }
        })
      }else{
        this.$message.error('请先登录再操作')
        this.$router.push('/log')
      }
    },
    submitComment(){
      let userRate = this.userScore
      let userComment = this.commentForm.userComment
      let uid = this.$cookie.get('userId')
      let mid = this.mid
      if (uid){
        this.$axios({
          method:"get",
          url:'/submitComment',
          params:{
            uid:uid,
            mid:mid,
            score: userRate,
            comment: userComment,
          }
        }).then(res=>{
          if(res.data.result){
            this.$message.warning('评论成功')
            this.getCommentsByMid()
          }else{
            this.$message.error('请先登录，再评价')
          }
        })
      }else {
        this.$message.error('请先登录，再评论')
      }
    },
    modifyMovie(mid){
      this.$router.push({name:'modifyMovie',params:{mid:parseInt(mid)}})
    },
  },
  created() {
    this.getMovieInfo()
    this.getRateByMid()
    this.getCommentsByMid()
    if(this.$cookie.get('userId')){
      this.$axios({
        method:"get",
        url:'/getRateByMidAndUid',
        params:{
          uid:this.$cookie.get('userId'),
          mid:this.mid
        },
      }).then(res=>{
        if (res.data.result){
          this.userScore = res.data.score;
        }else{
          this.userScore = 0;
        }
      })
    }
  },
  watch:{
    userScore:function (newval,oldval){
      if(this.$cookie.get('userId')){
        this.$axios({
          method:"get",
          url:'/rateMovie',
          params:{
            uid:this.$cookie.get('userId'),
            mid:this.mid,
            score:newval,
          }
        }).then(res=>{
          if(res.data.result){
            this.$message.success('评分成功')
            console.log('评分成功')
            this.getCommentsByMid()
          }
        })
      }else{
        this.$router.push({name:'log'})
      }
    },
    movieSlide:function (newVal,oldVal){
      this.$axios({
        method:"get",
        url:'/changeMovieSlide',
        params:{
          mid:this.mid,
          isSlide:this.movieSlide,
        }
      }).then(res=>{
        if(res.data.result){
          this.$message.success('轮播修改成功')
        }
      })
    },
  },

}
</script>

<style>
.movieDetail {

}
#movieTitle{

}
#movieCover{
  margin-top: 1em;
  width: 9em;
  height: 12em;
}
.movieDirector{
  width: 7em;
  /*background: #E1F3D8;*/
}
.movieActor{
  width: 7em;
  /*background: #E1F3D8;*/
}
</style>