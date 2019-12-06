<template>
  <div class="app-header">
    <div class="app-header-box">
      <div class="app-logo">
        <router-link to="/manager">
          <img :src="Logo" alt="Logo">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/assets/cheng-logo.png'
export default {
  name: 'AppTop',
  data() {
    return {
      Logo: Logo
    }
  }
}
</script>

<style lang="less" scoped>
.app-header {
  width: 100%; z-index: 9999;
  position: fixed; left: 0; top: 0; background: #ffffff; box-shadow: 8px -7px 9px 1px;
  .app-header-box {
    position: relative;
    .app-logo { 
      width: 170px; padding: 2px 0; height: 46px; cursor: pointer; display: inline-block; vertical-align: middle;
      img { width: 170px; height: 46px; }
    }
  }
}
</style>
