<template>
  <transition enter-active-class="animated fadeInLeft" leave-active-class="animated zoomOutDown">
    <div v-show="boardVisible" class="music-board-container" :style="{height: boardHeight + 'px'}">
      <div class="board-list">
        <h3>播放队列</h3>
        <div class="board-list-des">
          <span class="list-des-number">{{ playList.length }}首歌曲</span>
        </div>
        <div class="board-list-container">
          <div v-for="(v, index) in playList" :key="index" class="board-list-item">
            <div class="board-list-item-left">
              <div class="board-list-item-left-music-name">{{ v.musicName }}</div>
              <div class="board-list-item-left-singer-name">{{ v.singerName }}</div>
            </div>
            <div class="board-list-item-right"></div>
          </div>
        </div>
      </div>
      <div class="board-img">
        <div class="img" :style="{backgroundImage: `url('${require('@/assets/images/GEM.jpg')}')`}"></div>
      </div>
      <div class="board-lyric"></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Model, Prop, Watch } from 'vue-property-decorator'
import { Get } from '@/api/http'
import Player from '@/core/player'
import { Music } from '@/td/types'
@Component({
  name: 'MusicBoard'
})
export default class MusicPlayer extends Vue {
  @Prop({ type: Boolean, default: false }) boardVisible!: boolean
  private readonly player = Player
  private boardHeight: number = 400
  private playList: Array<Music> = []

  @Watch('boardVisible')
  onChangeValueBoardVisible(visible: boolean) {
    const body = document.getElementsByTagName('body')
    if (visible) {
      body[0].style.overflow = 'hidden'
    } else {
      body[0].style.overflow = 'visible'
    }
    this.updatePlayerList()
  }

  mounted() {
    window.addEventListener('resize', this.resize) 
    this.resize()
  }

  updatePlayerList() {
    this.playList = this.player.getPlayList()
  }

  resize(event?: UIEvent) {
    this.boardHeight = window.innerHeight - 90
  }

  destroyed() {
    window.removeEventListener('resize', this.resize)
  }

}
</script>

<style lang="less" scoped>
.music-board-container {
  position: absolute; left: 0; bottom: 90px; width: 100%;
  background: rgb(44, 44, 44);
  display: flex; justify-content: center; align-items: center;
  .board-list {
    width: 250px; min-height: 100%; background: rgb(48, 48, 48);
    h3 { color: white; font-size: 20px; font-weight: 400; margin: 60px 30px 15px 30px; }
    .board-list-des {
      display: flex; justify-content: flex-start; align-items: center;
      padding: 0 30px;
      .list-des-number { color: #999999; font-size: 12px; font-weight: 400; }
    }
    .board-list-container {
      .board-list-item {
        display: flex; justify-content: flex-start; align-items: center; height: 70px;
        padding: 0 30px;
        .board-list-item-left {
          flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
          .board-list-item-left-music-name {
            color: #ffffff; font-size: 14px; font-weight: 400; line-height: 20px;
          }
          .board-list-item-left-singer-name {
            color: #999999; font-size: 12px; font-weight: 400; line-height: 20px;
          }
        }
        .board-list-item-right {
          width: 50px;
        }
      }
      .board-list-item:hover {
        background: rgb(55, 55, 55); cursor: pointer;
      }
    }
  }
  .board-img {
    width: 250px; height: 100%;
    display: flex; justify-content: center; align-items: center;
    .img {
      width: 230px; height: 230px; border-radius: 4px;background: url('../../assets/images/GEM.jpg');
      background-repeat: no-repeat;background-size: cover;background-position: center;
    }
  }
  .board-lyric {
    flex: 1; height: 100%;
  }
}
</style>
