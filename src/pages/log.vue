<template>
  <div class="log">
    <!-- <headerBack></headerBack> -->
    <br/>
    <el-col :span="6" :offset="12" style="position: absolute;top:130px;">
      <div class="logBox">
        <br/><br/><br/>
        <el-dialog title="忘记密码" :visible.sync="dialogFormVisible">
          <el-form ref="resetPass" label-position='right' label-width="80px" :model="resetPassFrom" :rules="rePassRules"
                   style="margin-right: 40px">
            <el-form-item label="邮箱" prop="reMail">
              <el-input v-model="resetPassFrom.reMail"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="reTel">
              <el-input v-model="resetPassFrom.reTel"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="rePassword">
              <el-input v-model="resetPassFrom.rePassword" type="password"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitRePass('resetPass')">重置密码</el-button>
          </div>
        </el-dialog>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="登录" name="first">
            <el-form ref="loginForm" label-position='top' :model="loginForm" label-width="80px" size="big"
                     :rules="logRules">
              <el-form-item prop="logEmail" label="">
                <el-input v-model.trim="loginForm.logEmail" placeholder="邮箱"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input type="password" v-model="loginForm.logPass" placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="loginForm.delivery">保留7天登录状态</el-checkbox>
              </el-form-item>

              <el-form-item>
                <el-col :span="24" :offset="0">
                  <el-button style="width: 100%; background-color: #f0f6ee;color: #422517;"
                             icon="el-icon-check" :span="24" @click="submitLog('loginForm')">登录
                  </el-button>
                </el-col>
              </el-form-item>
              <el-form-item>
                <!-- <router-link to="forgetPass" id="forgetPassw">
                  忘记密码
                </router-link> -->
                <el-button type="text" @click="dialogFormVisible = true" id="forgetPassw">忘记密码</el-button>


              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册" name="second">
            <el-form ref="registerForm" label-position='top' :model="registerForm" label-width="80px"
                     size="big" :rules="regRules">
              <el-form-item prop="email">
                <el-input v-model.trim="registerForm.email" placeholder="邮箱"></el-input>
              </el-form-item>
              <el-form-item prop="tel">
                <el-input v-model="registerForm.tel" placeholder="电话"></el-input>
              </el-form-item>
              <el-form-item prop="pass">
                <el-input type="password" v-model="registerForm.pass" placeholder="密码">
                </el-input>
              </el-form-item>
              <el-form-item prop="repass">
                <el-input type="password" v-model="registerForm.repass" placeholder="再次输入密码"></el-input>
              </el-form-item>

              <el-form-item>
                <el-col :span="24" :offset="0">
                  <el-button style="width: 100%; background-color: #f0f6ee;color: #422517;"
                             icon="el-icon-check" :span="24" @click="submitRegister('registerForm')">注册
                  </el-button>
                </el-col>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

      </div>
    </el-col>

  </div>

</template>

<script>
import headerBack from '../components/headerBack.vue'
import jsCookie from "js-cookie";

export default {
  components: {
    headerBack
  },
  name: 'log',
  data() {
    var validateLogMail = (rule, value, callback) => {
      // console.log("12")
      const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
      if (value == '' || value == undefined || value == null) {
        callback();
      } else {
        if (!reg.test(value)) {
          callback(new Error('请输入正确的邮箱地址'));
        } else {
          this.$axios({
                method: 'get',
                url: '/haveMail/',
                params: {
                  mail: value,
                }
              }
          ).then(res => {
            if (res.data.result === false) {
              // console.log(res.data.result)
              // console.log('邮箱未注册')
              callback('该邮箱未注册')
            } else {
              // console.log('邮箱已经注册')
              callback()
            }
          })
          // callback();
        }
      }
    };
    var validateRegMail = (rule, value, callback) => {
      var re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(value)) {
        this.$axios({
              method: 'get',
              url: '/haveMail/',
              params: {
                mail: value,
              }
            }
        ).then(res => {
          if (res.data.result === true) {
            console.log(res.data.result)
            callback('该邮箱已注册')
          } else {
            console.log(res.data.result)
            callback()
          }
        })
        // callback();
      } else {
        callback(new Error('请输入正确邮箱格式'));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.repass !== '') {
          this.$refs.registerForm.validateField('repass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validateTel = (rule, value, callback) => {
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (value == '' || value == undefined || value == null) {
        callback();
      } else {
        if ((!reg.test(value)) && value != '') {
          callback(new Error('请输入正确的电话号码'));
        } else {
          this.$axios({
                method: 'get',
                url: '/haveTel/',
                params: {
                  tel: value,
                }
              }
          ).then(res => {
            if (res.data.result === true) {
              // console.log('该号码已经注册')
              callback('该手机号码已注册')
            } else {
              console.log(res.data.result)
              callback()
            }
          })
        }
      }
    };
    return {

      dialogFormVisible: false,
      resetPassFrom: {
        reTel: '',
        reMail: '',
        rePassword: ''
      },
      loginForm: {
        logEmail: '',
        logPass: '',
        delivery: false,
      },
      registerForm: {
        email: '',
        pass: '',
        repass: '',
        tel: '',
      },
      activeName: 'first',
      rePassRules: {
        rePassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, message: '密码长度大于6', trigger: 'blur'}
        ],
        reTel: [
            {required: true, message: '请输入注册电话', trigger: 'blur'},
            {min: 11,max: 11,message: '请输入正确格式手机',trigger: 'blur'},
            // {type: 'number', message: '电话必须为数字'}
        ],
        reMail: [
          {required: true, message: '请输入注册邮箱', trigger: 'blur'},
          {validator: validateLogMail, trigger: 'blur'},
        ]
      },
      logRules: {
        logEmail: [
            {required: true,message: '请输入注册邮箱',trigger: 'blur'},
            {validator: validateLogMail,trigger: 'blur'}
        ],
      },
      regRules: {
        email: [
            {required: true,message: '请输入注册邮箱',trigger: 'blur'},
            {validator: validateRegMail,trigger: 'blur'}
        ],
        pass: [
            {required: true,message: '请输入密码',trigger: 'blur'},
            {min: 6,message: '密码长度大于6',trigger: 'blur'},
            {validator: validatePass,trigger: 'blur'}
        ],
        repass: [
            {required: true,message: '请再次输入密码',trigger: 'blur'},
            {min: 6,message: '密码长度大于6',trigger: 'blur'},
            {validator: validatePass2,trigger: 'blur'}
        ],
        tel: [
            {required: true,message: '请输入手机号码',trigger: 'blur'},
            {min: 11,max: 11,message: '请输入正确格式手机',trigger: 'blur'},
            {validator: validateTel,trigger: 'blur'},

        ]
      },
    };


  },
  methods: {
    submitLog(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let logform={
            email : this.loginForm.logEmail,
            password : this.loginForm.logPass,
          }
          this.$axios({
            method:"post",
            url: "/login/",
            data: JSON.stringify(logform),
            header: {
              'Content-Type': 'application/json'  //如果写成contentType会报错
            }
          }).then(res => {
            if (res.data.result === false) {
              this.$message.error('登录失败，请检查密码是否正确');
              //修改失败，重新注册
            } else {
              //密码验证正确，读取的数据有id，name，type，img
              this.$message({
                message: '登录成功',
                type: 'warning'
              });
              let id = res.data.id;
              let type = res.data.type;
              if(this.loginForm.delivery){
                this.$cookie.set('userId',id,{expires:7})
                this.$cookie.set('type',type,{expires:7})
              }else{
                this.$cookie.set('userId',id,{expires:0.1})
                this.$cookie.set('type',type,{expires:0.1})
              }
              // this.$router.push("/");
              this.$router.go(-1);//回退到上一页面
            }
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitRegister(formName) {
      console.log(this.$refs[formName])
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          let regForm = {
            email: this.registerForm.email,
            tel: this.registerForm.tel,
            password: this.registerForm.pass,
            rePassword:this.registerForm.repass,
          }
          this.$axios({
                method: 'post',
                url: '/regUser/',
                data: JSON.stringify(regForm),
                header: {
                  'Content-Type': 'application/json'  //如果写成contentType会报错
                }
              }
          ).then(res => {
            if (res.data.result === false) {
              this.$message.error('注册失败，请重新检查邮箱与注册手机是否已经注册');
              //修改失败，重新注册
            } else {
              this.$message({
                message: '注册成功',
                type: 'warning'
              });
            }
          })
        } else {
          this.$message.error('请仔细填写信息哦');
          return false;
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitRePass(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          let repassform = {
            email: this.resetPassFrom.reMail,
            tel: this.resetPassFrom.reTel,
            password: this.resetPassFrom.rePassword,
          }
          this.$axios({
                method: 'post',
                url: '/forgetPass/',
                data: JSON.stringify(repassform),
                header: {
                  'Content-Type': 'application/json'  //如果写成contentType会报错
                }
              }
          ).then(res => {
            if (res.data.result === false) {
              this.$message.error('修改失败，请重新检查邮箱与注册手机是否匹配');
              //修改失败，请重新检查邮箱与注册手机是否匹配
            } else {
              this.$message({
                message: '密码修改成功',
                type: 'warning'
              });
            }
          })
        } else {
          this.$message.error('请仔细填写信息哦');
          return false;
        }
      });


    },
  }
}
</script>

<style scoped>
/*.el-row {*/
/*  margin-bottom: 20px;*/

/*&:last-child {*/
/*  margin-bottom: 0;*/
/*}*/
/*}*/

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.logBox {
  border: 1px solid #e4e6e5;
  border-radius: 5px;
  /* box-shadow: 5px 5px 10px 6px beige; */
  padding: 10%;
}

#forgetPassw {
  text-align: center;
  color: #33875a;

}

#forgetPassw:hover {
  color: #000000;

}

a {
  text-decoration: none;
}
</style>
