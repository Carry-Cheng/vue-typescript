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
          <el-tooltip content="立即播放">
            <el-button @click="handleClickImmediatelyPlay(v)" type="primary" icon="el-icon-video-play" circle></el-button>
          </el-tooltip>
          <el-tooltip content="添加到播放列表">
            <el-button type="primary" icon="el-icon-folder-add" circle></el-button>
          </el-tooltip>
          <el-tooltip content="笔芯">
            <el-button type="warning" icon="el-icon-star-on" circle></el-button>
          </el-tooltip>
          <el-tooltip content="分享">
            <el-button type="warning" icon="el-icon-share" circle></el-button>
          </el-tooltip>
          <el-tooltip content="下载">
            <el-button type="warning" icon="el-icon-download" circle></el-button>
          </el-tooltip>
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

  handleClickPlay (sourceId: number) {
    this.getMusicSourceById(sourceId)
  }

  private getMusicSourceById (sourceId: number) {
    // sourceId = 100
    Get('getMusicSourceById', { params: {sourceId} }).then((res: any) => {
      console.info(res)
    }).catch(error => {
      this.$message.info(error)
    })
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
