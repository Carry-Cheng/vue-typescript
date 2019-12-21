<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" class="app-find-recommend">
    <ul class="lists-ul">
      <li v-for="(v, index) in lists" :key="index" class="lists-li">
        <div class="li-index">
          <el-badge v-if="index < 3" value="hot"></el-badge>
          <el-badge v-else :value="(index + 1)" type="warning"></el-badge>
        </div>
        <div class="li-center">{{ `${v.singerName} - ${v.musicName}` }}</div>
        <div class="li-operate">
          <el-button title="立即播放" @click="handleClickImmediatelyPlay(v)" type="primary" icon="el-icon-video-play" circle></el-button>
          <el-button title="添加到播放列表" type="primary" icon="el-icon-folder-add" circle></el-button>
          <el-button title="笔芯" type="warning" icon="el-icon-star-on" circle></el-button>
          <el-button title="分享" type="warning" icon="el-icon-share" circle></el-button>
          <el-button title="下载" type="warning" icon="el-icon-download" circle></el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Model, Prop } from 'vue-property-decorator'
import { Get } from '@/api/http'
import { Music } from '@/td/types.d'
@Component({
  name: 'AppFindRecommend'
})
export default class AppFindRecommend extends Vue {
  private fullscreenLoading: boolean = false
  private lists: any[] = []
  mounted() {
    this.init()
  }
  private init () {
    this.fullscreenLoading = true
    Get('findRecommendList').then((res: any) => {
      this.fullscreenLoading = false
      let { code, data, message } = res
      if (code === 200) {
        this.lists = data
      } else {
        this.$message.info(message)
      }
    }).catch(error => {
      this.fullscreenLoading = false
      this.$message.info(error)
    })
  }

  private handleClickImmediatelyPlay (music: Music) {
    this.$store.dispatch('immediatelyPlay', music)
  }

}
</script>

<style lang="less" scoped>
.app-find-recommend {
  padding: 30px 100px;
  .lists-ul {
    margin: 0; padding: 0;
    .lists-li {
      list-style: none; display: flex; justify-content: center; align-items: center;
      background: #f6f6f6; margin-bottom: 20px; cursor: pointer; padding: 15px;
      .li-index {
        width: 60px; height: 60px; display: flex; align-items: center;
        /deep/ .el-badge { display: flex; }
      }
      .li-center {
        flex: 1; font-size: 14px; font-weight: 400; color: #999999;
      }
      .li-operate {width: 180px;}
    }
    .lists-li:hover { background: #f2f2f2; }
  }
}
</style>
