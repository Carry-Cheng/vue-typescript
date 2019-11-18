<template>
  <div class="app-frame">
    <app-top></app-top>
    <div class="app-center">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppTop from '@/views/frame/Top'
import AppFooter from '@/views/frame/Footer'
export default {
  name: 'AppFrame',
  components: { AppTop, AppFooter }
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
</style>
