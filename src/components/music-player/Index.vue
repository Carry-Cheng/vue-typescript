<template>
  <div class="music-player">
    <player></player>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Model, Prop } from 'vue-property-decorator'
import { Get } from '@/api/http'
import Player from '@/components/music-player/Player.vue'
@Component({
  name: 'MusicPlayer',
  components: { Player }
})
export default class MusicPlayer extends Vue {

}
</script>

<style lang="less" scoped>
.music-player {
  position: fixed; left: 0; bottom: 0; width: 100%; height: 90px; z-index: 3306;
  background: rgba(0, 0, 0, .8)
}
</style>
