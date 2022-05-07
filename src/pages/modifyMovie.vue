<template>
<div class="modifyMovie">
  <el-row>
    <el-col :span="10" :offset="3">
      <h1>修改影片信息</h1>
    </el-col>
  </el-row>
  <el-row style="margin-top: 2em">
    <el-col :span="15" :offset="3">
      <el-form :model="movieFrom" :rules="movieFromRules" ref="movieFrom" label-width="100px">
        <el-form-item label="电影名" prop="movieName">
          <el-input v-model="movieName" disabled></el-input>
        </el-form-item>
        <el-form-item label="电影时长" prop="movieTime">
          <el-input type="number" v-model="movieTime" @input="changeMovieTime"></el-input>
        </el-form-item>
        <el-form-item label="电影简介" prop="movieBio">
          <el-input @input="changeMovieBio" type="textarea" :autosize="{ minRows: 3, maxRows: 8}" placeholder="请输入简介" v-model="movieBio" maxlength="1000" show-word-limit >
          </el-input>
        </el-form-item>
        <el-form-item label="上映日期">
          <el-date-picker
              v-model="movieRelDate"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy/MM/dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="导演">
          <el-select v-model="directorList"
                     @change="changeMovieDirector"
                     multiple
                     filterable
                     remote
                     reserve-keyword
                     placeholder="请输入关键词"
                     :remote-method="selectDirector"
                     :loading="loading">
            <el-option
                v-for="item in directOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="演员">
          <el-select v-model="actorList"
                     @change="changeMovieActor"
                     multiple
                     filterable
                     remote
                     reserve-keyword
                     placeholder="请输入关键词"
                     :remote-method="selectActor"
                     :loading="loading"
                     style="width: 50%;"

          >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="电影封面">
          <el-upload
              class="avatar-uploader"
              action=""
              ref="upload"
              :limit="1"
              :show-file-list="true"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :http-request="httpRequest"
              :file-list="fileList"
          >
            <el-image :fit="'scale-down'" v-if="imageUrl" :src="imageUrl" class="avatar"></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="是否轮播展示">
          <el-switch
              style="display: block"
              v-model="movieSlide"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="轮播展示"
              inactive-text="非展示">
          </el-switch>
        </el-form-item>
        <el-form-item label="电影展示封面">
          <el-upload
              class="avatar-uploader"
              action=""
              ref="uploadSlideImg"
              :limit="1"
              :show-file-list="true"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :http-request="httpRequestSlide"
              :file-list="slideFile"
          >
            <el-image :fit="'scale-down'" v-if="slideUrl" :src="slideUrl" class="avatar"></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="语言">
          <el-checkbox-group v-model="movieLang">
            <el-checkbox label="汉语普通话"></el-checkbox>
            <el-checkbox label="汉语粤语"></el-checkbox>
            <el-checkbox label="汉语方言"></el-checkbox>
            <el-checkbox label="英语" ></el-checkbox>
            <el-checkbox label="日语" ></el-checkbox>
            <el-checkbox label="韩语"></el-checkbox>
            <el-checkbox label="德语"></el-checkbox>
            <el-checkbox label="法语"></el-checkbox>
            <el-checkbox label="俄语" ></el-checkbox>
            <el-checkbox label="西班牙语" ></el-checkbox>
            <el-checkbox label="葡萄牙语"></el-checkbox>
            <el-checkbox label="印度语"></el-checkbox>
            <el-checkbox label="其他"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="制片国家/地区">
          <el-checkbox-group v-model="movieRegion">
            <el-checkbox label="中国大陆"></el-checkbox>
            <el-checkbox label="中国香港"></el-checkbox>
            <el-checkbox label="中国台湾"></el-checkbox>
            <el-checkbox label="中国澳门" ></el-checkbox>
            <el-checkbox label="美国" ></el-checkbox>
            <el-checkbox label="日本"></el-checkbox>
            <el-checkbox label="韩国"></el-checkbox>
            <el-checkbox label="印度"></el-checkbox>
            <el-checkbox label="英国" ></el-checkbox>
            <el-checkbox label="德国" ></el-checkbox>
            <el-checkbox label="法国"></el-checkbox>
            <el-checkbox label="俄罗斯"></el-checkbox>
            <el-checkbox label="其他"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="影片类型">
          <el-checkbox-group v-model="typeList">
            <el-checkbox label="1">成人</el-checkbox>
            <el-checkbox label="2">喜剧</el-checkbox>
            <el-checkbox label="3">新闻</el-checkbox>
            <el-checkbox label="4" >真人秀</el-checkbox>
            <el-checkbox label="5" >脱口秀</el-checkbox>
            <el-checkbox label="6">爱情</el-checkbox>
            <el-checkbox label="7">传记</el-checkbox>
            <el-checkbox label="8">动画</el-checkbox>
            <el-checkbox label="9" >动作</el-checkbox>
            <el-checkbox label="10" >短片</el-checkbox>
            <el-checkbox label="11">儿童</el-checkbox>
            <el-checkbox label="12">犯罪</el-checkbox>
            <el-checkbox label="13">歌舞</el-checkbox>
            <el-checkbox label="14">古装</el-checkbox>
            <el-checkbox label="15">鬼怪</el-checkbox>
            <el-checkbox label="16">黑色电影</el-checkbox>
            <el-checkbox label="17" >荒诞</el-checkbox>
            <el-checkbox label="18" >纪录片</el-checkbox>
            <el-checkbox label="19">家庭</el-checkbox>
            <el-checkbox label="20">惊悚</el-checkbox>
            <el-checkbox label="21">剧情</el-checkbox>
            <el-checkbox label="22" >科幻</el-checkbox>
            <el-checkbox label="23" >恐怖</el-checkbox>
            <el-checkbox label="24">历史</el-checkbox>
            <el-checkbox label="25">冒险</el-checkbox>
            <el-checkbox label="26">奇幻</el-checkbox>
            <el-checkbox label="27">情色</el-checkbox>
            <el-checkbox label="28">同性</el-checkbox>
            <el-checkbox label="29">武侠</el-checkbox>
            <el-checkbox label="30" >舞台艺术</el-checkbox>
            <el-checkbox label="31">西部</el-checkbox>
            <el-checkbox label="32">戏曲</el-checkbox>
            <el-checkbox label="33">悬疑</el-checkbox>
            <el-checkbox label="34" >音乐</el-checkbox>
            <el-checkbox label="35" >运动</el-checkbox>
            <el-checkbox label="36">灾难</el-checkbox>
            <el-checkbox label="37">战争</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!--      图片上传-->
      </el-form>

    </el-col>
    <el-col :span="5" :offset="1">
      <div style="margin-top: 18em">
        <div v-for="item in dList">
          <el-tag type="info">{{item.directorIdOld}}</el-tag>：{{item.personName}}
        </div>
        <div v-for="item in aList">
          <el-tag type="info">{{item.actorIdOld}}</el-tag>：{{item.personName}}
        </div>
      </div>

    </el-col>
  </el-row>

</div>
</template>

<script>
export default {
  name: "modifyMovie",
  props:{
    mid:{
      type:Number,
      default:0,
    }
  },
  data(){
    return{
      aList:[],
      dList:[],
      movieFrom:{},
      movieName:'',
      movieCover:'',
      movieSlideImg:'',
      movieBio:'',
      movieRegion:[],
      movieTime:'',
      movieLang:[],
      movieRelDate:'',
      actorList:[],
      directorList:[],
      typeList:[],
      fileList:[],
      slideFile:[],
      options:[],
      directOptions:[],
      list:[],
      imageUrl:'',
      slideUrl:'',
      movieSlide:'',
      loading: false,
      movieFromRules:{
        movieName: [
          {required: true, message: '请输入电影名', trigger: 'blur'},
        ],
      },
    };
  },
  methods:{
    getMovieInfo(){
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
          if (res.data.movieInfo.movieLang){
            this.movieLang = res.data.movieInfo.movieLang.replaceAll(' ','').split('/');
          }
          if(res.data.movieInfo.movieRegion){
            this.movieRegion = res.data.movieInfo.movieRegion.replaceAll(' ','').split('/');
          }
          this.movieTime=res.data.movieInfo.movieTime;
          this.movieRelDate=res.data.movieInfo.movieRelDate;
          this.movieCover = res.data.movieInfo.movieImg;
          this.movieSlideImg = res.data.movieInfo.movieSlideImg;
          this.movieSlide = res.data.movieInfo.movieSlide;
          this.imageUrl = "http://127.0.0.1:8000/media/" + this.movieCover
          this.slideUrl = "http://127.0.0.1:8000/media/" + this.movieSlideImg
          this.actorList = res.data.actorId;
          this.aList=res.data.actor;
          this.dList=res.data.director;
          this.typeList = res.data.typeId;
          this.directorList = res.data.directorId;
          this.imgLoad=true;
        }else{
          this.$message.error('无此电影404');
          this.$router.go(-1);
        }
      })
    },
    checkId() {
      let uid = this.$cookie.get('userId')
      let type = this.$cookie.get('type')
      if (type==1){
        this.$router.go(-1)
      }else{
        this.$axios({
          method:"get",
          url:'/getUserById',
          params:{
            userId:uid,
          },
        }).then(res=>{
          if(res.data.result){
            if(res.data.type){
              this.$cookie.remove('userId');
              this.$cookie.remove('type');
              this.$router.push('/log')
              this.$message.error('非管理员用户，请重新登陆')
            }else{
              this.$message.warning('欢迎登录HERec管理员')
            }
          }else{
            this.$cookie.remove('userId');
            this.$cookie.remove('type');
            this.$router.push('/log')
            this.$message.error('非管理员用户，请重新登陆')
          }
        })
      }
    },
    getPerson(){
      this.$axios({
        method:"get",
        url:'/getPerson',
      }).then(res=>{
        this.list = res.data.personList.map(item=>{
          return{
            value:item[0],
            label:item[1],
          }
        })
      })
    },
    selectActor(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    selectDirector(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.directOptions = this.list.filter(item => {
            return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.directOptions = [];
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      let types = ['image/jpeg', 'image/jpg', 'image/png'];
      const isJPG = types.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    httpRequest(param){
      let fileObj = param.file
      let fd = new FormData()
      fd.append('file',fileObj)
      fd.append('mid', this.mid)
      this.$axios({
            method: 'post',
            url: '/changeMovieCover',
            data: fd,
            header: {
              'Content-Type': 'multipart/form-data'  //如果写成contentType会报错
            }
          }
      ).then(res => {
        if (res.data.result === false) {
          this.$message.error('修改失败');
          //修改失败，重新注册
        } else {
          this.$message({
            message: '修改封面成功',
            type: 'warning'
          });
        }
      })
    },
    httpRequestSlide(param){
      let fileObj = param.file
      let fd = new FormData()
      fd.append('file',fileObj)
      fd.append('mid', this.mid)
      this.$axios({
            method: 'post',
            url: '/changeMovieSlideImg',
            data: fd,
            header: {
              'Content-Type': 'multipart/form-data'  //如果写成contentType会报错
            }
          }
      ).then(res => {
        if (res.data.result === false) {
          this.$message.error('修改失败');
          //修改失败，重新注册
        } else {
          this.$message({
            message: '修改展示Img成功',
            type: 'warning'
          });
        }
      })
    },



    changeMovieTime(){
      console.log(this.movieTime)
      this.$axios({
        method:"get",
        url:'/changeMovieTime',
        params:{
          mid:this.mid,
          mTime:this.movieTime,
        }
      }).then(res=>{
        if(res.data.result){
          this.$message.success('电影时长修改成功')
        }
      })
    },
    changeMovieBio(){
      this.$axios({
        method:"get",
        url:'/changeMovieBio',
        params:{
          mid:this.mid,
          mBio:this.movieBio,
        }
      }).then(res=>{
        if(res.data.result){
          this.$message.success('电影简介修改成功')
        }
      })
    },
    changeMovieRelDate(){
      this.$axios({
        method:"get",
        url:'/changeMovieRelDate',
        params:{
          mid:this.mid,
          mRelDate:this.movieRelDate,
        }
      }).then(res=>{
        if(res.data.result){
          this.$message.success('电影上映时间修改成功')
        }
      })
    },
    changeMovieLang(){
      let mLang=this.movieLang[0]
      for (let i=1;i<this.movieLang.length;i++) {
        mLang = mLang+'/'+ this.movieLang[i]
      }
      console.log(mLang)
      this.$axios({
        method:"get",
        url:'/changeMovieLang',
        params:{
          mid:this.mid,
          mLang:mLang,
        }
      }).then(res=>{
        if(res.data.result){
          this.$message.success('电影语言修改成功')
        }
      })
    },
    changeMovieRegion(){
      let mRegion=this.movieRegion[0]
      for (let i=1;i<this.movieRegion.length;i++) {
        mRegion = mRegion+'/'+ this.movieRegion[i]
      }
      console.log(mRegion)
      this.$axios({
        method:"get",
        url:'/changeMovieRegion',
        params:{
          mid:this.mid,
          mRegion:mRegion,
        }
      }).then(res=>{
        if(res.data.result){
          this.$message.success('电影制片地区修改成功')
        }
      })
    },
    changeMovieType(){
      let tStr=''
      if(this.typeList){
        tStr=this.typeList[0]
        for (let i=1;i<this.typeList.length;i++){
          tStr=tStr+','+this.typeList[i]
        }
      }
      this.$axios({
        method:"get",
        url:'/changeMovieType',
        params:{
          mid:this.mid,
          mType:tStr,
        }
      }).then(res=>{
        if(res.data.result){
          this.$message.success('电影类型修改成功')
        }
      })
    },
    changeMovieDirector(){
      let dStr=''
      if(this.directorList){
        dStr=this.directorList[0]
        for (let i=1;i<this.directorList.length;i++){
          dStr=dStr+','+this.directorList[i]
        }
      }
      this.$axios({
        method:"get",
        url:'/changeMovieDirector',
        params:{
          mid:this.mid,
          mDirector:dStr,
        }
      }).then(res=>{
        if(res.data.result){
          this.$message.success('导演修改成功')
        }
      })
    },
    changeMovieActor(){
      let aStr=''
      if(this.actorList){
        aStr=this.actorList[0]
        for (let i=1;i<this.actorList.length;i++){
          aStr=aStr+','+this.actorList[i]
        }
      }
      this.$axios({
        method:"get",
        url:'/changeMovieActor',
        params:{
          mid:this.mid,
          mActor:aStr,
        }
      }).then(res=>{
        if(res.data.result){
          this.$message.success('演员修改成功')
        }
      })
    },




  },
  created() {
    this.checkId()
    this.getPerson()
    this.getMovieInfo()
  },
  watch:{
    movieRelDate:function (){
      this.changeMovieRelDate()
    },
    movieLang:function (){
      this.changeMovieLang()
    },
    movieRegion:function (){
      this.changeMovieRegion()
    },
    typeList:function (){
      this.changeMovieType()
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

<style scoped>

</style>