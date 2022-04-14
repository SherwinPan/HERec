<template>
	<div class="headerBack">
		<router-link to='/' id="logo">
			<!-- <div class="block"> -->
			<div>
				<el-image style="width:180px;height:60px;" :src="require('../assets/HERec.png')" alt="Vue logo">
				</el-image>
			</div>
		</router-link>
		<!-- 搜素框 -->
<!-- 		<el-col :span="13" :offset="11"> -->
			<div style="float: right; margin-right: 15%">
				<div v-if="$route.path==='/log'">
					<p></p>
				</div>
				<div v-else>
					<headermenu></headermenu>
				</div>
			</div>
<!-- 		</el-col> -->
	</div>
</template>

<script>
	import headermenu from '@/components/Headermenu'
	export default {
		name: 'headerBack',
		components: {
			headermenu
		}
	}
</script>

<style scoped>
	.headerBack {
		background-color: #f0f6ee;
		width: 100%;
		height: 80px;

	}

	#logo {
		position: absolute;
		text-align: left;
		left: 15%;
		top: 10px;
		z-index: 10;
	}

	p {
		margin: 0px;
	}
</style>
