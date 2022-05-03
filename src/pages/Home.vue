<template>
	
	<div id="home">
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
