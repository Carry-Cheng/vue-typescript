<template>
  <div class="manager-content-container" :style="{'minHeight': minHeight + 'px'}">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AppNull',
  data() {
    return {
      minHeight: 400,
    }
  },
  mounted() {
    this.computedMinHeight()
    window.onresize = () => {
      this.computedMinHeight()
    }
  },
  methods: {
    computedMinHeight() {
      let height = window.document.body.clientHeight || window.document.documentElement.clientHeight
      this.minHeight = height - 135
    }
  }
}
</script>
<style lang="less" scoped>
.manager-content-container {
  padding: 15px 15px; position: relative;
  background: #ffffff; box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
}
</style>