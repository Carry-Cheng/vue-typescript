<template>
  <div class="app-manager-left">
    <ul class="app-manager-ul">
      <li class="app-manager-li app-manager-li-active">
        <i class="el-icon-s-home"></i>
        <span class="text">首页</span>
      </li>
      <li class="app-manager-li">
        <i class="el-icon-headset"></i>
        <span class="text">歌曲管理</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppManagerLeft'
}
</script>

<style lang="less" scoped>
.app-manager-left {
  position: fixed; width: 180px; height: calc(100% - 52px);
  left: 0; top: 52px; background: #ffffff; box-shadow: -4px 7px 6px 1px;
  .app-manager-ul {
    margin: 0; padding: 0; cursor: pointer;
    .app-manager-li {
      padding: 10px 20px 10px 40px; background: #ffffff;
      i { font-size: 14px; color: #444444; font-weight: bold; margin-right: 5px; }
      .text { font-size: 14px; font-weight: bold; color: #444444; }
    }
    .app-manager-li-active {
      background: goldenrod;
      i {color: #ffffff;}
      .text { color: #ffffff; }
    }
  }
}
</style>
