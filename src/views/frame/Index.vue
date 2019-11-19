<template>
  <div :class="isOther ? 'app-frame-other' : 'app-frame'">
    <app-top></app-top>
    <div class="app-center">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppTop from '@/views/frame/Top'
import AppFooter from '@/views/frame/Footer'
export default {
  name: 'AppFrame',
  components: { AppTop, AppFooter },
  data() {
    return {
      isOther: false
    }
  },
  watch: {
    $route (route) {
      if (route.fullPath === '/find/recommend' || route.fullPath === '/find/rank') {
        this.isOther = false
      } else {
        this.isOther = true
      }
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
