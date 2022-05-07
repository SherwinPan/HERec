<template>
<div class="searchPerson">
  <el-row v-if="personNum==0">
    <el-col :span="12" :offset="3">
      无查询结果
    </el-col>
  </el-row>
  <el-row style="margin-top: 4em">
    <el-col :span="15" :offset="3">
      <el-collapse accordion>

        <el-collapse-item v-for="(p,index) in this.personList" :key="index">
          <template slot="title">
            <p @click="jumpPersonDetail(p.personId)">{{p.personName}}</p>
          </template>
          <el-row>
            <el-col :span="20">
              <div>出生日期：{{p.personBirth}}</div>
              <div>性别：{{p.personGender}}</div>
              <div>出生地：{{p.personPlace}}</div>
              <div>影人简介：{{p.personBio}}</div>
            </el-col>
            <el-col :span="4" v-if="$cookie.get('type')==0">
              <i class="el-icon-s-tools" @click="modifyPerson(p.personId)" ></i>
            </el-col>
          </el-row>
        </el-collapse-item>

      </el-collapse>


      <el-pagination
          background
          :current-page.sync="curPage"
          layout="prev, pager, next"
          :total="this.personNum"
          @current-change="searchPerson"
      >
      </el-pagination>
    </el-col>

  </el-row>

</div>
</template>

<script>
export default {
  name: "searchPerson",
  props:{
    pName: {
      type: String,
      default: ''
    },
  },
  data(){
    return{
      personNum:0,
      personList:[],
      curPage: 1,
      activeName:'1',
    };
  },
  methods:{
    searchPerson(){
      this.$axios({
        method:"get",
        url:'/searchPerson',
        params:{
          pName:this.pName,
          curPage:this.curPage
        }
      }).then(res=>{
        if(res.data.result){
          this.personNum=res.data.personNum;
          this.personList=res.data.personList;
        }else{
          this.personNum=0;
        }
      })
    },
    jumpPersonDetail(pid){
      // console.log("jump")
      this.$router.push({name:'personDetail',params:{pid:parseInt(pid)}});
    },
    modifyPerson(pid){
      this.$router.push({name:'modifyPerson',params:{pid:parseInt(pid)}})
    }
  },
  created() {
    this.searchPerson()
  },
  watch:{
    pName:function (){
      location.reload()
    }
  }
}
</script>

<style scoped>

</style>