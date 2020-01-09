<template>
  <div class="music-player">
    <player @board-visible="handleBoardVisible"></player>
    <board :board-visible="boardVisible"></board>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Model, Prop } from 'vue-property-decorator'
import { Get } from '@/api/http'
import Player from '@/components/music-player/Player.vue'
import Board from '@/components/music-player/Board.vue'
@Component({
  name: 'MusicPlayer',
  components: { Player, Board }
})
export default class MusicPlayer extends Vue {
  private boardVisible: boolean = false
  handleBoardVisible (visible: boolean) {
    this.boardVisible = visible
  }
}
</script>

<style lang="less" scoped>
.music-player {
  position: fixed; left: 0; bottom: 0; width: 100%; height: 90px; z-index: 1306;
  background: rgb(44, 44, 44)
}
</style>
