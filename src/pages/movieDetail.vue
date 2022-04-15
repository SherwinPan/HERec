<template>
  <div class="movieDetail">
    <div id="movieTitle">
      <h1>这是电影标题</h1>
    </div>

    <el-row>
      <el-col :span="4" :offset="3">
        <div id="movieCover" style="background: #2c3e50" >
          <el-image :src="require('../assets/logo.png')" :fit="'cover'"></el-image>
        </div>
      </el-col>
      <el-col :span="5" :offset="1">
        <div id="movieInfo">
          <el-descriptions class="margin-top" title="" :column="1">
            <el-descriptions-item label="导演">导演超链接</el-descriptions-item>
            <el-descriptions-item label="编剧">编剧姓名</el-descriptions-item>
            <el-descriptions-item label="主演">演员超链接</el-descriptions-item>
            <el-descriptions-item label="类型">
              <el-tag size="small">学校</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="语言">英语</el-descriptions-item>
          </el-descriptions>
        </div>
      </el-col>
      <el-col :span="1">
        <el-divider direction="vertical"></el-divider>
      </el-col>
      <el-col :span="4">

        评分
        <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
        </el-rate>
        <table style="width: 13em">
          <tr>
            <td style="width: 2em">1星</td>
            <td>
              <el-progress :percentage="50" ></el-progress>
            </td>
          </tr>
          <tr>
            <td>2星</td>
            <td>
              <el-progress :percentage="100"></el-progress>
            </td>
          </tr>
          <tr>
            <td>3星</td>
            <td>
              <el-progress :percentage="100"></el-progress>
            </td>
          </tr>
          <tr>
            <td>4星</td>
            <td>
              <el-progress :percentage="100"></el-progress>
            </td>
          </tr>
          <tr>
            <td>5星</td>
            <td>
              <el-progress :percentage="100"></el-progress>
            </td>
          </tr>
        </table>

      </el-col>
    </el-row>

    <div>

    </div>
    mid={{ mid }}

  </div>
</template>

<script>
export default {
  props: {
    mid: {
      type: Number,
      default: 0
    }
  },
  name: "movieDetail"
}
</script>

<style scoped>
.movieDetail {

}
#movieTitle{
  margin-left: 9em;
}
#movieCover{
  width: 9em;
  height: 12em;
}
</style>