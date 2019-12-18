<template>
  <div :class="isOther ? 'app-frame-other' : 'app-frame'">
    <music-player></music-player>
    <app-top></app-top>
    <div class="app-center">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script lang="ts">
import MusicPlayer from '@/components/music-player/Index.vue'
import AppTop from '@/views/frame/Top.vue'
import AppFooter from '@/views/frame/Footer.vue'
import { Vue, Component, Model, Prop, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
@Component({
  name: 'AppFrame',
  components: { MusicPlayer, AppTop, AppFooter }
})
export default class AppFrame extends Vue {
  private isOther: boolean = false
  @Watch('$route', {immediate: true, deep: true})
  onChangeValue (route: Route) {
    if (route.fullPath === '/find/recommend' || route.fullPath === '/find/rank') {
      this.isOther = false
    } else {
      this.isOther = true
    }
  }
}
</script>

<style lang="less" scoped>
.app-frame {
  width: 100%;
  min-width: 768px;
  padding-top: 85px;
  height: calc(100% - 85px);
  .app-center {
    min-height: calc(100% - 135px);
  }
}
.app-frame-other {
  width: 100%;
  min-width: 768px;
  padding-top: 50px;
  height: calc(100% - 50px);
  .app-center {
    min-height: calc(100% - 135px);
  }
}
</style>
