<template>
  <div class="player">
    <div class="player-control">
      <i class="cc-iconfont cc-iconxiayiqu rotate180 cc-iconfont-small" title="上一曲"></i>
      <div class="player-control-btn">
        <i v-if="isPlay" class="cc-iconfont cc-iconzanting" title="暂停" @click="handleClickPlay(false)"></i>
        <i v-else class="cc-iconfont cc-iconbofang" title="播放" @click="handleClickPlay(true)"></i>
        <i v-if="isLoading" class="el-icon-loading control-loading" title="加载中..."></i>
      </div>
      <i class="cc-iconfont cc-iconxiayiqu cc-iconfont-small" title="下一曲"></i>
    </div>
    <div class="player-music">
      <div class="player-singer-flag" :style="{backgroundImage: `url('${require('@/assets/images/GEM2.jpg')}')`}"></div>
      <div class="player-song">
        <div class="player-song-up">
          <span class="player-song-name">{{ currentMusicName }}</span>
          <span class="player-singer-name">{{ currentMusicSinger }}</span>
        </div>
        <div class="player-song-down">
          <div class="player-song-progress">
            <el-progress 
              :text-inside="true"
              :stroke-width="14"
              :percentage="20"
              status="warning"
              :show-text="false"
            ></el-progress>
          </div>
          <div class="player-song-times">
            <span class="player-song-times-start">{{'00:25'}}</span>
            <span class="player-song-times-flag">/</span>
            <span class="player-song-times-end">{{'04:25'}}</span>
          </div>
        </div>
      </div>
      
    </div>
    <div class="player-operate"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Model, Prop, Watch } from 'vue-property-decorator'
import { Get } from '@/api/http'
import Player from '@/core/player'
import { Music } from '@/td/types.d'
@Component({
  name: 'VuePlayer'
})
export default class VuePlayer extends Vue {
  private readonly player: Player = Player.getInstance()
  private isPlay: boolean = false
  private isLoading: boolean = false
  private currentMusicName: string = ''
  private currentMusicSinger: string = ''
  private currentMusicPercentage: number = 0
  private currentMusicTime: string = ''
  private currentMusicTotalTime: string = ''
  private playerList: Array<Music> = []

  get vuePlayerHelper () {
    return this.$store.getters.playerHelper
  }

  @Watch('vuePlayerHelper')
  onChangeValueVuePlayerHelper(v: Music) {
    this.isLoading = true
    this.isPlay = true
    this.currentMusicName = v.musicName || '~~~'
    this.currentMusicSinger = v.singerName || '~~~'
    this.getMusicSourceById(v.sourceId)
  }

  @Watch('player.isLoading')
  onChangeValueIsLoading(v: boolean) {
    this.isLoading = v
  }

  mounted() {
    this.initPlayer()
  }
  
  private initPlayer () {
    this.player.isLoading
    console.info(this.player)
  }

  private getMusicSourceById (sourceId: number) {
    // sourceId = 100
    Get('getMusicSourceById', { params: {sourceId} }).then((res: any) => {
      let { code, data, message } = res
      if (code === 200) {
        let buffer = data.data
        this.player.loadSourceStream(buffer)
      } else {
        this.$message.info(message)
      }
    }).catch(error => {
      this.$message.info(error)
    })
  }

  handleClickPlay (flag: boolean) {
    if (flag) {
      this.isPlay = true
      this.player.play()
    } else {
      this.isPlay = false
      this.player.stop()
    }
  }

}
</script>

<style lang="less" scoped>
.player {
  position: relative; height: 100%; display: flex; justify-content: center; align-items: center;
  .player-control {
    display: flex; height: 100%; justify-content: center; align-items: center;
    .cc-iconfont { font-size: 48px; color: #cccccc; cursor: pointer; }
    .cc-iconfont:hover { color: #ffffff; }
    .cc-iconfont-small { font-size: 32px; }
    .rotate180 { transform:rotate(180deg) }
    .player-control-btn {
      width: 48px; height: 52px; position: relative; display: flex; justify-content: center; align-items: center;
      .control-loading { position: absolute; left: 0; top: 0; z-index: 10;
      font-size: 48px; color: #ffffff; cursor: pointer;
      background: transparent; }
    }
  }
  .player-music {
    display: flex; margin: 0 10px; height: 100%; justify-content: center; align-items: center;
    .player-singer-flag {
      width: 70px; height: 70px; border-radius: 4px;background: url('../../assets/images/GEM.jpg');
      background-repeat: no-repeat;background-size: cover;background-position: center;
    }
    .player-song {
      flex: 1; height: 70px;
      .player-song-up {
        padding: 0 10px; height: 30px; display: flex; justify-content: start; align-items: flex-end;
        .player-song-name {
          margin-right: 30px; font-size: 14px; color: #cccccc; font-weight: 400;
        }
        .player-singer-name {
          font-size: 12px; color: #cccccc; font-weight: 400;
        }
      }
      .player-song-down {
        width: 100%; height: 30px; display: flex; justify-content: center; align-items: center;
        .player-song-progress {
          flex: 1;
          min-width: 400px;
          margin: 0 10px;
        }
        .player-song-times {
          width: 80px; display: flex; height: 100%; justify-content: center; align-items: center;
          .player-song-times-start, .player-song-times-flag, .player-song-times-end {
            font-size: 13px; color: #cccccc; font-weight: 400;
          }
          .player-song-times-flag { margin: 0 5px; }
        }
      }
    }
  }
  .player-operate {}
}
</style>
