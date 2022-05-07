<template>
<div class="modifyPerson">
  <el-row>
  <el-col :span="10" :offset="3">
    <h1>修改影人信息</h1>
  </el-col>
</el-row>
  <el-row style="margin-top: 2em">
    <el-col :span="15" :offset="3">
      <el-form :model="personForm" ref="personForm" label-width="100px">
        <el-form-item label="影人名" prop="personName">
          <el-input @input="changePersonName" v-model="personName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="personGender">
          <el-radio v-model="personGender" label="男">男</el-radio>
          <el-radio v-model="personGender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="影人生日">
          <el-date-picker
              @change="changePersonBirth"
              v-model="personBirth"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="影人照片">
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
            <el-image v-if="imageUrl" :src="imageUrl" class="avatar" :fit="'scale-down'"></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="出生地" prop="personPlace">
          <el-input @input="changePersonPlace" v-model="personPlace"></el-input>
        </el-form-item>
        <el-form-item  label="电影简介" prop="personBio">
          <el-input @input="changePersonBio" type="textarea" :autosize="{ minRows: 3, maxRows: 8}" placeholder="请输入简介" v-model="personBio" maxlength="1000" show-word-limit >
          </el-input>
        </el-form-item>
      </el-form>

    </el-col>
  </el-row>


</div>
</template>

<script>
export default {
  name: "modifyPerson",
  props:{
    pid:{
      type:Number,
      default:0,
    },
  },
  data(){
    return{
      personForm:[],
      personName: '',
      personBio: '',
      personBirth: '',
      personPlace: '',
      personGender: '男',
      personId:'',
      imageUrl:'',
      fileList:[],
      personImg:'',
      loading: false,
    }
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
          this.personName=res.data.personInfo.personName
          this.personBirth=res.data.personInfo.personBirth
          this.personPlace=res.data.personInfo.personPlace
          this.personGender=res.data.personInfo.personGender
          this.personImg=res.data.personInfo.personImg
          this.personBio=res.data.personInfo.personBio
          this.personId=res.data.personInfo.personId
          this.imageUrl=res.data.personInfo.personImg
        }else{
          this.$message.error('无此影人404');
          this.$router.go(-1);
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
    httpRequest(param){
      let fileObj = param.file
      let fd = new FormData()
      fd.append('file',fileObj)
      fd.append('pid', this.pid)
      this.$axios({
            method: 'post',
            url: '/changePersonImg',
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
    changePersonBirth(){
      this.$axios({
        method:"get",
        url:'/changePersonBirth',
        params:{
          pid:this.pid,
          pBirth:this.personBirth,
        }
      }).then(res=>{
        if(res.data.result){
          this.$message.success('影人生日修改成功')
        }
      })
    },
    changePersonName(){
      this.$axios({
        method:"get",
        url:'/changePersonName',
        params:{
          pid:this.pid,
          pName:this.personName,
        }
      }).then(res=>{
        if(res.data.result){
          this.$message.success('影人姓名修改成功')
        }
      })
    },
    changePersonGender(){
      this.$axios({
        method:"get",
        url:'/changePersonGender',
        params:{
          pid:this.pid,
          pGender:this.personGender,
        }
      }).then(res=>{
        if(res.data.result){
          this.$message.success('影人性别修正')
        }
      })
    },
    changePersonBio(){
      this.$axios({
        method:"get",
        url:'/changePersonBio',
        params:{
          pid:this.pid,
          pBio:this.personBio,
        }
      }).then(res=>{
        if(res.data.result){
          this.$message.success('影人简介修改成功')
        }
      })
    },
    changePersonPlace(){
      this.$axios({
        method:"get",
        url:'/changePersonPlace',
        params:{
          pid:this.pid,
          pPlace:this.personPlace,
        }
      }).then(res=>{
        if(res.data.result){
          this.$message.success('影人出生地修改成功')
        }
      })
    },



  } ,
  created() {
    this.getPersonInfo()
  },
  watch:{
    personGender:function (){
      this.changePersonGender()
    }
  }
}
</script>

<style scoped>

</style>