<template>
  <div class="app-footer">
    <div class="app-footer-box">
      Footer
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
  width: 100%; height: 135px; position: relative; background: #333333;
  .app-footer-box {
    height: 100%; margin: 0 10%;
  }
}
@media screen and (max-width: 768px) {
  .app-footer-box {
    margin: 0 0!important;
  }
}
</style>
