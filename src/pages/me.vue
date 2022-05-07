<template xmlns="http://www.w3.org/1999/html">
<div class="me">
  <el-row style="margin-top: 1em">
    <el-col :span="18" :offset="3">
      <h1 style="color: #007722">欢迎你 {{this.userInfo.userName}}</h1>
      <el-form ref="user" :model="userNameFrom" label-width="80px" width="10em">
        <el-form-item label="邮件">
          {{this.userInfo.email}}
        </el-form-item>
        <el-form-item label="手机">
          {{this.userInfo.tel}}
        </el-form-item>
      </el-form>
      <el-form ref="userNameFrom" :model="userNameFrom" label-width="80px" width="10em" :rules="userNameFromRules">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userNameFrom.userName" style="width: 15em;" ></el-input>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="success" @click="changeName('userNameFrom')">修改用户名</el-button>
        </el-form-item>

      </el-form>
      <h2 style="color: #007722">近期评分</h2>
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
        <el-table-column prop="score" label="我的评分"width="80"></el-table-column>
      </el-table>
      <h2 style="color: #007722;margin-top: 1em">近期评论</h2>
      <el-table :data="commentMovieList" style=" width: auto;">
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
        <el-table-column prop="score" label="我的评分"width="80"></el-table-column>
      </el-table>

    </el-col>
  </el-row>


</div>
</template>

<script>
export default {
  name: "me",
  data(){
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入一个用户名'));
      } else {
        this.$axios({
          method:"get",
          url:'/hasThisName',
          params:{
            userName:value
          }
        }).then(res=>{
          if (res.data.result){
            callback('该用户名已存在，请换个吧')
          }else {
            callback()
          }
        })
      }
    };
    return{
      userNameFrom:{
        userName: '',
      },
      uid:-1,
      userInfo:{
        tel:'',
        email:'',
        userName:'',
        userImg:'',
        type:1,
      },
      numOfRate:0,
      movieList:[],
      numOfComment:0,
      commentMovieList:[],
      userNameFromRules:{
        userName:[
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {validator: validateName, trigger: 'blur'},
        ]
      },
    };
  },
  methods:{

    changeName(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let uid = this.uid
          let uName = this.userNameFrom.userName
          this.$axios({
            method:"get",
            url:'/changeUserName',
            params:{
              uid: uid,
              userName:uName,
            }
          }).then(res=>{
            if(res.data.result){
              this.$message.warning('修改用户名成功')
              location.reload()
            }else {
              this.$message.error(res.data.err)
            }
          })
        } else {
          this.$message.error('请仔细填写信息哦');
          return false;
        }
      });

    },
    checkId(){
      let id=this.$cookie.get('userId');
      let userT = this.$cookie.get('type');
      if(id && userT){
        this.uid = id;
        this.userInfo.type = userT;

        this.$axios({
          method:"get",
          url:'/getUserById',
          params:{
            userId : this.uid,
          }
        }).then(res=>{
          if(res.data.result === true){
            this.userInfo.type = res.data.type;
            this.userInfo.tel = res.data.tel;
            this.userInfo.userImg = res.data.img;
            this.userInfo.userName = res.data.name;
            this.userNameFrom.userName = res.data.name;
            this.userInfo.email = res.data.email;
            this.$cookie.set('type',this.userInfo.type,{expires:7})
          }else{
            this.$cookie.remove('userId');
            this.$cookie.remove('type');
            this.$router.push('/log')
          }
        })
      }else {
        this.$router.push('/log')
      }
    },
    getNewFiveRateMovieByUserId(){
      // let id=this.$cookie.get('userId');
      this.$axios({
        method:"get",
        url:'/getNewFiveRateMovieByUserId',
        params:{
          userId : this.uid,
        }
      }).then(res=>{
        if(res.data.numOfRate >0){
          this.numOfRate= res.data.numOfRate
          this.movieList= res.data.movieList
        }else{
          this.numOfRate=0
        }
      })
    },
    getNewFiveCommentMovieByUserId(){
      this.$axios({
        method:"get",
        url:'/getNewFiveCommentMovieByUserId',
        params:{
          userId : this.uid,
        }
      }).then(res=>{
        if(res.data.numOfRate >0){
          this.numOfComment= res.data.numOfRate
          this.commentMovieList= res.data.movieList
        }else{
          this.numOfComment=0
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
    this.checkId();
  },
  mounted() {
    this.getNewFiveRateMovieByUserId();
    this.getNewFiveCommentMovieByUserId();
  }
}
</script>

<style scoped>
.me{

}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #2c3e50;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 90%;
}
</style>