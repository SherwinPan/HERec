<template>
	<div id="headermenu">
		<el-menu style="top:20px;flex-wrap: nowrap;" :default-active="activeIndex" class="el-menu-demo"
			mode="horizontal" background-color="#f0f6ee" text-color="#422517" active-text-color="#4f6f46" >
			<el-menu-item index="1">
				<router-link to="/rec">首页</router-link>
			</el-menu-item>
			<el-submenu index="2">
				<template slot="title">榜单</template>
				<el-menu-item index="2-1">最新电影</el-menu-item>
				<el-menu-item index="2-2">上新热门</el-menu-item>
				<el-menu-item index="2-3">经典排行</el-menu-item>
				<el-submenu v-if="type==0" index="2-4">
					<template slot="title">管理人员操作</template>
					<el-menu-item index="2-4-1"><router-link to="/createMovie">添加电影</router-link></el-menu-item>
					<el-menu-item index="2-4-2"><router-link to="/createPerson">添加影人</router-link></el-menu-item>
					<el-menu-item index="2-4-3">人员管理</el-menu-item>
				</el-submenu>
			</el-submenu>
			<el-menu-item index="3">猜你喜欢</el-menu-item>
      <el-submenu index="4" v-if="this.$cookie.get('userId')">
          <template slot="title">{{ this.userName }}</template>
          <el-menu-item index="4-1">
            <router-link to="/me">个人中心</router-link>
          </el-menu-item>
          <el-menu-item index="4-2" @click="logout()">退出登录</el-menu-item>
      </el-submenu>
      <el-menu-item index="4" v-else>
					<!-- 否则显示登录注册 -->
					<router-link to='/log'>登录/注册</router-link>
      </el-menu-item>



		</el-menu><br /><br /><br />


	</div>

</template>

<script>
	export default {
		name: 'Headermenu',
		data() {
			return {
				activeIndex: '1',
        userName:'',
        type:1,
			};
		},
    methods:{
      logout(){
        this.$cookie.remove('userId');
        this.$cookie.remove('type');
        location.reload();
        this.$message({
          message: '退出成功',
          type: 'warning'
        });
      },
    },
    created() {
      if(this.$cookie.get('userId')){
       this.$axios({
         method:"get",
         url:'/getUserNameByUid',
         params:{
           uid:this.$cookie.get('userId')
         },
       }).then(res=>{
         if (res.data.result){
           this.userName=res.data.userName
           this.type=res.data.type
         }else{

         }
       })
      }
    },
  }
</script>

<style>
	#headermenu {}

	a {
		text-decoration: none;
	}
</style>
