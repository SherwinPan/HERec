<template xmlns:el-col="http://www.w3.org/1999/html">
	<div class="headerBack">
    <router-link to='/' id="logo" >
      <div>
        <el-image style="width:180px;height:60px;" :src="require('../assets/HERec.png')" alt="Vue logo">
        </el-image>
      </div>
    </router-link>
    <el-col :span="9" :offset="4">
      <div v-if="$route.path==='/log'"></div>
      <el-form v-else :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 38px" size="mini">
        <el-form-item label="">
          <el-select v-model="formInline.choose" style="width: 5.1em">
            <el-option label="电影" value="movie"></el-option>
            <el-option label="影人" value="person"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formInline.text" prefix-icon="el-icon-search" placeholder="搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="background: #007722">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="11">
      <div style="float: right; margin-right: 2%">
        <div v-if="$route.path==='/log'">
          <p></p>
        </div>
        <div v-else>
          <headermenu></headermenu>
        </div>
      </div>

    </el-col>


		<!-- 搜素框 -->
<!-- 		<el-col :span="13" :offset="11"> -->

<!-- 		</el-col> -->
	</div>
</template>

<script>
	import headermenu from '@/components/Headermenu'
	export default {
		name: 'headerBack',
		components: {
			headermenu
		},
    data(){
      return{
        formInline:{
          choose:'movie',
          text:'',
        },
      };
    },
    methods:{
      onSubmit(){
        if(this.formInline.choose=='movie'){
          this.$router.push({name:'searchMovie',params:{mName:this.formInline.text}})
        }else {
          this.$router.push({name:'searchPerson',params:{pName:this.formInline.text}})
        }
      }
    },
    created() {

    },
  }
</script>

<style>
.el-col{
  z-index: 20;
}

</style>

<style scoped>
	.headerBack {
		background-color: #f0f6ee;
		width: 100%;
		height: 80px;
	}
	#logo {
		position: absolute;
		text-align: left;
		left: 2%;
		top: 10px;
		z-index: 10;
	}

	p {
		margin: 0px;
	}
</style>
