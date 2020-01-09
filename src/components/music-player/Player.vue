<template>
  <div class="player">
    <div class="player-control">
      <i class="cc-iconfont cc-iconxiayiqu rotate180 cc-iconfont-small" title="上一曲"
        @click="handleClickLast()"
      ></i>
      <div class="player-control-btn">
        <i v-if="isPlay" class="cc-iconfont cc-iconzanting" title="暂停" @click="handleClickPlay(false)"></i>
        <i v-else class="cc-iconfont cc-iconbofang" title="播放" @click="handleClickPlay(true)"></i>
        <i v-if="!isLoaded" class="el-icon-loading control-loading" title="加载中..."></i>
      </div>
      <i class="cc-iconfont cc-iconxiayiqu cc-iconfont-small" title="下一曲"
        @click="handleClickNext()"
      ></i>
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
              :percentage="percentage"
              status="warning"
              :show-text="false"
            ></el-progress>
          </div>
          <div class="player-song-times">
            <span class="player-song-times-start">{{ currentMusicTimeText }}</span>
            <span class="player-song-times-flag">/</span>
            <span class="player-song-times-end">{{ currentMusicTotalTimeText }}</span>
          </div>
        </div>
      </div>
      
    </div>
    <div class="player-operate">
      <el-popover
        v-model="playStatusPopover"
        placement="top"
        width="1"
        popper-class="play-type-popover"
        trigger="click">
        <div class="play-type-content">
          <i @click="handleChangePlayStatus(0)" class="cc-iconfont cc-iconsort" title="循环播放"></i>
          <i @click="handleChangePlayStatus(1)" class="cc-iconfont cc-iconsuijisenlin" title="随机播放"></i>
          <i @click="handleChangePlayStatus(2)" class="cc-iconfont cc-icondanquxunhuan" title="单曲循环"></i>
        </div>
        <div slot="reference" class="play-type">
          <i v-if="playStatus === 0" class="cc-iconfont cc-iconsort" title="循环播放"></i>
          <i v-if="playStatus === 1" class="cc-iconfont cc-iconsuijisenlin" title="随机播放"></i>
          <i v-if="playStatus === 2" class="cc-iconfont cc-icondanquxunhuan" title="单曲循环"></i>
        </div>
      </el-popover>
      <el-popover
        v-model="playVolumePopover"
        placement="top"
        width="1"
        popper-class="play-type-popover"
        trigger="click">
        <div class="play-type-content">
          playVolumePopover
        </div>
        <div slot="reference" class="play-type">
          <i class="cc-iconfont cc-iconshengyin" title="音量调整"></i>
        </div>
      </el-popover>
      <span>
        <i @click="handleMusicList()" class="cc-iconfont cc-iconA_-bofangliebiao" title="歌曲列表">
          <span class="number">{{ playList.length > 0 ? playList.length : '' }}</span>
        </i>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Model, Prop, Watch } from 'vue-property-decorator'
import { Get } from '@/api/http'
import Player from '@/core/player'
import { Music } from '@/td/types.d'
import { PlayStatus } from '@/enum/global'
@Component({
  name: 'VuePlayer'
})
export default class VuePlayer extends Vue {
  private readonly player = Player
  private playStatus: number = PlayStatus.whole
  private playStatusPopover: boolean = false
  private playVolumePopover: boolean = false
  private currentId: number = -1
  private interval: number = -1
  private isPlay: boolean = false
  private isEnd: boolean = false
  private isLoaded: boolean = true
  private currentMusicName: string = ''
  private currentMusicSinger: string = ''
  private percentage: number = 0
  private currentMusicTime: number = 0
  private currentMusicTotalTime: number = 0
  private playList: Array<Music> = []
  private visibleBoard: boolean = false

  get vuePlayerHelper () {
    return this.$store.getters.playerHelper
  }

  get currentMusicTimeText () {
    if (this.currentMusicTime > 0 && this.currentMusicTime >= this.currentMusicTotalTime) {
      this.isEnd = true
    } else {
      this.isEnd = false
    }
    return this.secondToMS(this.currentMusicTime)
  }

  get currentMusicTotalTimeText () {
    return this.secondToMS(this.currentMusicTotalTime)
  }

  @Watch('isEnd')
  onChangeValueIsEnd(isEnd: number) {
    if (isEnd) {
      this.player.cutSongNumber++
      this.currentMusicTime = 0
      this.currentMusicTotalTime = 0
    }
  }

  @Watch('vuePlayerHelper')
  onChangeValueVuePlayerHelper(v: Music) {
    this.isLoaded = false
    this.isPlay = true
    this.currentMusicName = v.musicName || '~~~'
    this.currentMusicSinger = v.singerName || '~~~'
    this.currentMusicTime = 0
    this.currentMusicTotalTime = 0
    this.percentage = 0
    this.currentId = v.id
    this.player.loadSource(v)
  }

  @Watch('player.isLoaded')
  onChangeValueIsLoaded(isLoaded: boolean) {
    this.isLoaded = isLoaded
    this.currentMusicTime = 0
    this.currentMusicTotalTime = 0
    if (isLoaded) {
      this.playList = this.player.getPlayList()
      this.currentMusicTotalTime = this.player.getAudioDuration()
      this.startInterval()
    }
  }

  mounted() {
    console.info(this.player)
  }

  private startInterval () {
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      if (this.currentMusicTime < this.currentMusicTotalTime) {
        this.currentMusicTime++
      }
      if (this.percentage >= 100) {
        clearInterval(this.interval)
        this.interval = -1
        return false
      }
      if (this.currentMusicTotalTime === 0 ) {
        this.percentage = 0
      } else {
        this.percentage = Math.round((this.currentMusicTime / this.currentMusicTotalTime) * 100)
      }
    }, 1000)
  }

  private stopInterval () {
    clearInterval(this.interval)
    this.interval = -1
  }

  private secondToMS (second: number) {
    if (second) {
      let m = Math.floor(second / 60)
      let s = second % 60
      return `${(Array(2).join('0') + m).slice(-2)}:${(Array(2).join('0') + s).slice(-2)}`
    } else {
      return '00:00'
    }
  }

  handleClickPlay (flag: boolean) {
    if (this.playList.length === 0) {
      this.$message.info('请添加歌曲.')
      return false
    }
    if (flag) {
      this.isPlay = true
      this.startInterval()
      this.player.play(this.currentId, this.currentMusicTime)
    } else {
      this.isPlay = false
      this.player.stop()
      this.stopInterval()
    }
  }

  handleClickNext() {
    if (this.playList.length > 1) {
      let index = this.playList.findIndex((element: Music) => this.currentId === element.id)
      index++
      if (index >= this.playList.length) {
        index = 0
      }
      if (this.playList[index]) {
        this.cutSong(this.playList[index])
      }
    }
  }

  handleClickLast() {
    if (this.playList.length > 1) {
      let index = this.playList.findIndex((element: Music) => this.currentId === element.id)
      index--
      if (index < 0) {
        index = this.playList.length - 1
      }
      if (this.playList[index]) {
        this.cutSong(this.playList[index])
      }
    }
  }

  cutSong(music: Music, offset?: number) {
    this.currentId = music.id
    this.currentMusicTime = 0
    this.currentMusicTotalTime = 0
    this.currentMusicName = music.musicName || '~~~'
    this.currentMusicSinger = music.singerName || '~~~'
    this.player.stop()
    this.startInterval()
    this.player.play(music.id, offset)
    this.currentMusicTotalTime = this.player.getAudioDuration()
  }

  handleChangePlayStatus (status: number) {
    this.playStatus = status
    this.playStatusPopover = false
    this.player.autoSetPlayStatus(status)
  }

  handleMusicList () {
    this.visibleBoard = !this.visibleBoard
    this.$emit('board-visible', this.visibleBoard)
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
        padding: 0 10px; height: 30px; display: flex; justify-content: flex-start; align-items: flex-end;
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
          min-width: 300px;
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
  .player-operate {
    width: 120px; height: 30px; display: flex; justify-content: flex-start; align-items: flex-end;
    margin-top: 5px; 
    span {
      margin: 0 5px;
      i { 
        font-size: 14px; color: #cccccc; font-weight: 400; cursor: pointer;
        .number { font-size: 12px; }
      }
      i:hover { color: #ffffff; }
    }
  }
}
</style>

<style lang="less">
.play-type-popover {
  z-index: 3310 !important; min-width: 14px !important;
  background: rgba(0, 0, 0, 0.8) !important;
  border: 1px solid rgba(0, 0, 0, 0) !important;
  .popper__arrow { border-top-color: rgba(0, 0, 0, 0.8) !important; }
  .popper__arrow::after { border-top-color: rgba(0, 0, 0, 0.8) !important; }
  .play-type-content {
    width: 20px; cursor: pointer;
    display: flex; justify-content: center; flex-direction: column;
    i { font-size: 14px; color: #eeeeee; font-weight: 400; }
    i:hover { color: #ffffff; }
  }
}
.play-type {
  display: flex; width: 100%; justify-content: center; align-items: center;
  i { font-size: 14px; color: #cccccc; font-weight: 400; }
}
</style>
