<template>
  <div class="createMovie">
    <el-row>
      <el-col :span="10" :offset="3">
        <h1>新建影片</h1>
      </el-col>
    </el-row>
    <el-row style="margin-top: 2em">
      <el-col :span="15" :offset="3">
        <el-form :model="movieFrom" :rules="movieFromRules" ref="movieFrom" label-width="100px">
          <el-form-item label="电影名" prop="movieName">
            <el-input v-model="movieFrom.movieName"></el-input>
          </el-form-item>
          <el-form-item label="电影时长" prop="movieTime">
            <el-input type="number" v-model="movieFrom.movieTime"></el-input>
          </el-form-item>
          <el-form-item label="电影简介" prop="movieBio">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 8}" placeholder="请输入简介" v-model="movieFrom.movieBio" maxlength="1000" show-word-limit >
            </el-input>
          </el-form-item>
          <el-form-item label="上映日期">
            <el-date-picker
                v-model="movieFrom.movieRelDate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy/MM/dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="导演">
            <el-select v-model="movieFrom.directorList"
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
            <el-select v-model="movieFrom.actorList"
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
                :auto-upload="false"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="语言">
            <el-checkbox-group v-model="movieFrom.movieLang">
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
            <el-checkbox-group v-model="movieFrom.movieRegion">
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
            <el-checkbox-group v-model="movieFrom.typeList">
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

          <el-form-item>
            <el-button type="primary" @click="submitMovieForm('movieFrom')">立即创建</el-button>
            <el-button @click="resetForm('movieFrom')">重置</el-button>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>


  </div>
</template>

<script>
export default {
  name: "createMovie",
  data(){
    return{
      movieFrom:{
        movieName:'',
        movieCover:'',
        movieBio:'',
        movieRegion:[],
        movieTime:'',
        movieLang:[],
        movieRelDate:'',
        actorList:[],
        directorList:[],
        typeList:[],
      },
      fileList:[],
      options:[],
      directOptions:[],
      list:[],
      loading: false,
      movieFromRules:{
        movieName: [
          {required: true, message: '请输入电影名', trigger: 'blur'},
        ],
      },
    };
  },
  methods:{
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

    submitMovieForm(form){
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$refs.upload.submit();
        } else {
          this.$message.error('请仔细填写信息哦');
          return false;
        }
      })
    },
    resetForm(form){

    },
    httpRequest(param){
      console.log(param)
      let fileObj = param.file
      let fd = new FormData()
      fd.append('file',fileObj)
      for (let i in this.movieFrom) {
        console.log(i)
        fd.append(i, this.movieFrom[i])
      }
      this.$axios({
            method: 'post',
            url: '/createMovie',
            data: fd,
            header: {
              'Content-Type': 'multipart/form-data'  //如果写成contentType会报错
            }
          }
      ).then(res => {
        if (res.data.result === false) {
          this.$message.error('注册失败，请重新处理信息');
          //修改失败，重新注册
        } else {
          this.$message({
            message: '初始化成功',
            type: 'warning'
          });
        }
      })

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

  },
  created() {
    this.checkId()
    this.getPerson()
  },
  mounted() {

  },
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>