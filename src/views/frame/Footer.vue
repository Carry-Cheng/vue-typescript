<template>
  <div class="app-footer">
    <div class="app-footer-box">
      <div class="author">author-1057415350@qq.com</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style lang="less" scoped>
.app-footer {
  width: 100%; height: 135px; position: relative; background: #ededed;
  .app-footer-box {
    height: 100%; margin: 0 10%;
    .author { font-size: 16px; font-weight: 400; color: #333333; text-align: center; line-height: 50px; }
  }
}
@media screen and (max-width: 768px) {
  .app-footer-box {
    margin: 0 0!important;
  }
}
</style>
