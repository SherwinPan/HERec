<template>
<div class="createPerson">
  <el-row>
    <el-col :span="10" :offset="3">
      <h1>新建影人</h1>
    </el-col>
  </el-row>
  <el-row style="margin-top: 2em">
    <el-col :span="15" :offset="3">
      <el-form :model="personForm" :rules="personFormRules" ref="personForm" label-width="100px">
        <el-form-item label="影人名" prop="personName">
          <el-input v-model="personForm .personName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="personGender">
          <el-radio v-model="personForm.personGender" label="男">男</el-radio>
          <el-radio v-model="personForm.personGender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="影人生日">
          <el-date-picker
              v-model="personForm.personBirth"
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
              :auto-upload="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="出生地" prop="personPlace">
          <el-input v-model="personForm.personPlace"></el-input>
        </el-form-item>
        <el-form-item label="电影简介" prop="personBio">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 8}" placeholder="请输入简介" v-model="personForm.personBio" maxlength="1000" show-word-limit >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitMovieForm('personForm')">立即创建</el-button>
          <el-button @click="resetForm('movieFrom')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-col>
  </el-row>

</div>
</template>

<script>
export default {
  name: "createPerson",
  data(){
    return{
      personForm:{
        personName: '',
        personBio: '',
        personBirth: '',
        personPlace: '',
        personGender: '',
      },
      imageUrl:'',
      fileList:[],
      loading: false,
      personFormRules:{
        personName: [
          {required: true, message: '请输入影人名', trigger: 'blur'},
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
    httpRequest(param){
      console.log(param)
      let fileObj = param.file
      let fd = new FormData()
      fd.append('file',fileObj)
      for (let i in this.personForm) {
        console.log(i)
        fd.append(i, this.personForm[i])
      }
      this.$axios({
            method: 'post',
            url: '/createPerson',
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
    created(){
      this.checkId()
    },

  }




}
</script>

<style scoped>

</style>