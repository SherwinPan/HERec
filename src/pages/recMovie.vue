<template>
  <div class="resMovie">
    <div class="block">
        <div class="spanTitle">
          猜你喜欢
        </div>
        <div class="spanContent">
          <router-link :to="{name:'movieDetail',params:{mid:item.movieId}}" v-for="(item,index) in recMovieList" :key="index" >
            <el-image class="spanContentImg"
                      style="margin: 20px 0px 0px 20px;border-radius: 4px;height: 9em;width:13vw" :src="$store.getters.getMediaUrl+item.movieImg" :fit="'cover'">
            </el-image>
            <p style="text-align: center;margin: 0px ; text-decoration:none">{{ item.movieName.slice(0,13) }}</p>
          </router-link>
        </div>
        <div class="spanContent">
          <router-link :to="{name:'movieDetail',params:{mid:item.movieId}}" v-for="(item,index) in recMovieList1" :key="index" >
            <el-image class="spanContentImg"
                      style="margin: 20px 0px 0px 20px;border-radius: 4px;height: 9em;width:13vw" :src="$store.getters.getMediaUrl+item.movieImg" :fit="'cover'">
            </el-image>
            <p style="text-align: center;margin: 0px ; text-decoration:none">{{ item.movieName.slice(0,13) }}</p>
          </router-link>
        </div>
      <div class="spanContent">
        <router-link :to="{name:'movieDetail',params:{mid:item.movieId}}" v-for="(item,index) in recMovieList2" :key="index" >
          <el-image class="spanContentImg"
                    style="margin: 20px 0px 0px 20px;border-radius: 4px;height: 9em;width:13vw" :src="$store.getters.getMediaUrl+item.movieImg" :fit="'cover'">
          </el-image>
          <p style="text-align: center;margin: 0px ; text-decoration:none">{{ item.movieName.slice(0,13) }}</p>
        </router-link>
      </div>
      <div class="spanContent">
        <router-link :to="{name:'movieDetail',params:{mid:item.movieId}}" v-for="(item,index) in recMovieList3" :key="index" >
          <el-image class="spanContentImg"
                    style="margin: 20px 0px 0px 20px;border-radius: 4px;height: 9em;width:13vw" :src="$store.getters.getMediaUrl+item.movieImg" :fit="'cover'">
          </el-image>
          <p style="text-align: center;margin: 0px ; text-decoration:none">{{ item.movieName.slice(0,13) }}</p>
        </router-link>
      </div>

      <div class="spanContent">
        <router-link :to="{name:'movieDetail',params:{mid:item.movieId}}" v-for="(item,index) in recMovieList4" :key="index" >
          <el-image class="spanContentImg"
                    style="margin: 20px 0px 0px 20px;border-radius: 4px;height: 9em;width:13vw" :src="$store.getters.getMediaUrl+item.movieImg" :fit="'cover'">
          </el-image>
          <p style="text-align: center;margin: 0px ; text-decoration:none">{{ item.movieName.slice(0,13) }}</p>
        </router-link>
      </div>
      <div class="spanContent">
        <router-link :to="{name:'movieDetail',params:{mid:item.movieId}}" v-for="(item,index) in recMovieList5" :key="index" >
          <el-image class="spanContentImg"
                    style="margin: 20px 0px 0px 20px;border-radius: 4px;height: 9em;width:13vw" :src="$store.getters.getMediaUrl+item.movieImg" :fit="'cover'">
          </el-image>
          <p style="text-align: center;margin: 0px ; text-decoration:none">{{ item.movieName.slice(0,13) }}</p>
        </router-link>
      </div>
      <div class="spanContent">
        <router-link :to="{name:'movieDetail',params:{mid:item.movieId}}" v-for="(item,index) in recMovieList6" :key="index" >
          <el-image class="spanContentImg"
                    style="margin: 20px 0px 0px 20px;border-radius: 4px;height: 9em;width:13vw" :src="$store.getters.getMediaUrl+item.movieImg" :fit="'cover'">
          </el-image>
          <p style="text-align: center;margin: 0px ; text-decoration:none">{{ item.movieName.slice(0,13) }}</p>
        </router-link>
      </div>
      <div class="spanContent">
        <router-link :to="{name:'movieDetail',params:{mid:item.movieId}}" v-for="(item,index) in recMovieList7" :key="index" >
          <el-image class="spanContentImg"
                    style="margin: 20px 0px 0px 20px;border-radius: 4px;height: 9em;width:13vw" :src="$store.getters.getMediaUrl+item.movieImg" :fit="'cover'">
          </el-image>
          <p style="text-align: center;margin: 0px ; text-decoration:none">{{ item.movieName.slice(0,13) }}</p>
        </router-link>
      </div>

      </div>
  </div>
</template>

<script>
export default {
  name: "recMovie",
  data(){
    return{
      uid:'',
      type:'',
      username:'',
      recMovieList:[],
      recMovieList1:[],
      recMovieList2:[],
      recMovieList3:[],
      recMovieList4:[],
      recMovieList5:[],
      recMovieList6:[],
      recMovieList7:[],
    };
  },
  methods:{
    checkId(){
      let id=this.$cookie.get('userId');
      let userT = this.$cookie.get('type');
      if(id && userT){
        this.uid = id;
        this.type = userT;

        this.$axios({
          method:"get",
          url:'/getUserById',
          params:{
            userId : this.uid,
          }
        }).then(res=>{
          if(res.data.result === true){
            this.userName = res.data.name;
            this.$cookie.set('type',this.type,{expires:7})
          }else{
            this.$cookie.remove('userId');
            this.$cookie.remove('type');
            this.$router.push('/log')
            this.$message.warning('登陆后再使用哦')
          }
        })
      }else {
        this.$router.push('/log')
        this.$message.warning('登陆后再使用哦')
      }
    },
    getRec(){
      let uid = this.$cookie.get('userId')
      if(uid){
        this.$axios({
          method:"get",
          url:'/getRecMore',
          params:{
            uid:uid,
          }
        }).then(res=>{
          this.recMovieList=res.data.recMovieList.slice(0,6)
          this.recMovieList1=res.data.recMovieList.slice(6,12)
          this.recMovieList2=res.data.recMovieList.slice(12,18)
          this.recMovieList3=res.data.recMovieList.slice(18,24)
          this.recMovieList4=res.data.recMovieList.slice(24,30)
          this.recMovieList5=res.data.recMovieList.slice(30,36)
          this.recMovieList6=res.data.recMovieList.slice(36,42)
          this.recMovieList7=res.data.recMovieList.slice(42,48)
        })
      }else{

      }
    },





  },
  created() {
    this.checkId()
    this.getRec()
  },
}
</script>

<style>
.spanTitle {
  margin-left: 2em;
  font-size: 1.8em;
  font-weight: bold;

}

.spanContent {
  margin-left: 2em;
  margin-right: 2em;
  margin-bottom: 3em;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.spanContentImg {
  /*transition: all 1.3s ease;*/
  /*transition: all linear 2s*/
}

.spanContentImg :hover {
  transform: scale(1.2);
}
#recMovie{
  margin-top: 2em;
  overflow: hidden;
}
</style>