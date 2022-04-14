<template>
	<div id="headermenu">
		<el-menu style="top:20px;flex-wrap: nowrap;" :default-active="activeIndex" class="el-menu-demo"
			mode="horizontal" background-color="#f0f6ee" text-color="#422517" active-text-color="#4f6f46">
			<el-menu-item index="1">
				<router-link to="/rec">首页</router-link>
			</el-menu-item>
			<el-submenu index="2">
				<template slot="title">我的工作台</template>
				<el-menu-item index="2-1">选项1</el-menu-item>
				<el-menu-item index="2-2">选项2</el-menu-item>
				<el-menu-item index="2-3">选项3</el-menu-item>
				<el-submenu index="2-4">
					<template slot="title">选项4</template>
					<el-menu-item index="2-4-1">选项1</el-menu-item>
					<el-menu-item index="2-4-2">选项2</el-menu-item>
					<el-menu-item index="2-4-3">选项3</el-menu-item>
				</el-submenu>
			</el-submenu>
			<el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
			<el-menu-item index="4">
				<div v-if="$route.path==='/log'">
					<!-- 如果有登录信息则显示头像 -->
					<p>log log</p>
				</div>
				<div v-else>
					<!-- 否则显示登录注册 -->
					<router-link to='/log'>登录/注册</router-link>
				</div>

			</el-menu-item>
		</el-menu><br /><br /><br />


	</div>

</template>

<script>
	export default {
		name: 'Headermenu',
		data() {
			return {
				activeIndex: '1'
			};
		},
	}
</script>

<style>
	#headermenu {}

	a {
		text-decoration: none;
	}
</style>
