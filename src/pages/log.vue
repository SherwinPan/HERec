<template>
	<div class="log">
		<!-- <headerBack></headerBack> -->
		<br />
		<el-col :span="6" :offset="12" style="position: absolute;top:130px;">
			<div class="logBox">
				<br /><br /><br />
				<el-dialog title="忘记密码" :visible.sync="dialogFormVisible">
					这是表格
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
					</div>
				</el-dialog>

				<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
					<el-tab-pane label="登录" name="first">
						<el-form ref="loginForm" label-position='top' :model="loginForm" label-width="80px" size="big"
							:rules="logRules">
							<el-form-item prop="logEmail" label="">
								<el-input v-model="loginForm.logEmail" placeholder="邮箱"></el-input>
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
										icon="el-icon-check" :span="24" @click="submitLog('loginForm')">登录</el-button>
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
								<el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
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
										icon="el-icon-check" :span="24" @click="submitRegister">注册</el-button>
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
	export default {
		components: {
			headerBack
		},
		name: 'log',
		data() {
			var validateLogMail = (rule, value, callback) => {
				console.log("12")
				const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
				if (value == '' || value == undefined || value == null) {
					console.log("123")
					callback();
				} else {
					if (!reg.test(value)) {
						console.log("1234")
						callback(new Error('请输入正确的邮箱地址'));
					} else {
						console.log("1235")
						callback();
					}
				}
			};
			var validateRegMail = (rule, value, callback) => {
				var re =
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if (re.test(value)) {
					// 进行查重，是否已经注册
					callback();
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
						// 进行查重
						callback();
					}
				}
			};
			return {

				dialogFormVisible: false,
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
				logRules: {
					logEmail: [{
							required: true,
							message: '请输入注册邮箱',
							trigger: 'blur'
						},
						{
							validator: validateLogMail,
							trigger: 'blur'
						}
					],
				},
				regRules: {
					email: [{
							required: true,
							message: '请输入注册邮箱',
							trigger: 'blur'
						},
						{
							validator: validateRegMail,
							trigger: 'blur'
						}
					],
					pass: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							message: '密码长度大于6',
							trigger: 'blur'
						},
						{
							validator: validatePass,
							trigger: 'blur'
						}
					],
					repass: [{
							required: true,
							message: '请再次输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							message: '密码长度大于6',
							trigger: 'blur'
						},
						{
							validator: validatePass2,
							trigger: 'blur'
						}
					],
					tel: [
						{required: true,
							message: '请输入手机号码',
							trigger: 'blur'
						},
						{
							min: 11,
							max: 11,
							message: '请输入正确格式手机',
							trigger: 'blur'
						},
						{
							validator: validateTel,
							trigger: 'blur'
						}
					]
				},
			};


		},
		methods: {
			submitLog(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
						this.$router.push("/");
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			submitRegister() {
				console.log("register submit")
			},
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	}
</script>

<style scoped>
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

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
