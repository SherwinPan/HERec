<template>
	
	<div id="home">
		<!-- <headerBack></headerBack> -->
<!-- 		<router-link to='Home' >
			<div class="block">
				<el-image style="width:100px;height:100px;" 
				:src="require('../assets/logo.png')"
				alt="Vue logo">
				</el-image>				
			</div>			
		</router-link ><br/> -->
		
		
		<router-view></router-view>
	</div>
	
</template>

<script>
	import headerBack from '@/components/headerBack.vue'
	export default {
		name: 'Home',
		components:{
			headerBack
		}
	}
</script>

<style>
	#home{
		font-family: Avenir,Arial, Helvetica, sans-serif;
		color: #2c3e50;
	}
</style>
