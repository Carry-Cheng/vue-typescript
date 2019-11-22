<template>
  <div class="app-frame">
    <app-top></app-top>
    <app-left></app-left>
    <app-breadcrumb></app-breadcrumb>
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
import AppBreadcrumb from '@/views/manager/manager-frame/Breadcrumb'
export default {
  name: 'AppManagerFrame',
  components: { AppTop, AppLeft, AppBreadcrumb },
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
  padding-top: 90px;
  padding-left: 180px;
  height: calc(100% - 90px);
  .app-center {
    padding: 5px 10px;
    min-height: calc(100% - 20px);
  }
}
</style>
