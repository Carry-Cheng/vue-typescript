<template>
  <div class="app-frame">
    <app-top></app-top>
    <app-left></app-left>
    <div class="app-center">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import AppTop from '@/views/manager/manager-frame/Top'
import AppLeft from '@/views/manager/manager-frame/Left'
export default {
  name: 'AppManagerFrame',
  components: { AppTop, AppLeft },
  data() {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.app-frame {
  width: calc(100% - 180px);
  min-width: 768px;
  padding-top: 50px;
  padding-left: 180px;
  height: calc(100% - 50px);
  .app-center {
    padding: 10px;
  }
}
</style>
