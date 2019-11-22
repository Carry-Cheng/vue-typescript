<template>
  <div class="app-manager-left">
    <ul class="app-manager-ul">
      <template v-for="(v, index) in menus">
        <li :key="index" class="app-manager-li"
          :class="activeIndex === index ? 'app-manager-li-active' : ''"
          @click="goto(v, index)"
        >
          <i class="el-icon-headset"></i>
          <span class="text">
            {{ v.name }}
          </span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppManagerLeft',
  data() {
    return {
      menus: [
        { name: '首页', path: '/manager/welcome' },
        { name: '音乐管理', path: '/manager/music' }
      ],
      activeIndex: 0
    }
  },
  created () {
    let route = this.$route
    for (let index = 0; index < this.menus.length; index++) {
      const element = this.menus[index]
      if (element.path === route.path) {
        this.activeIndex = index
        break
      }
    }
  },
  methods: {
    goto(v, index) {
      if (v.path !== this.$route.path) {
        this.activeIndex = index
        this.$router.push(v.path)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.app-manager-left {
  position: fixed; width: 180px; height: calc(100% - 52px);
  left: 0; top: 52px; background: #ffffff; box-shadow: -4px 7px 6px 1px;
  .app-manager-ul {
    margin: 0; padding: 0; cursor: pointer; user-select: none;
    .app-manager-li {
      padding: 10px 20px 10px 40px; background: #ffffff;
      i { font-size: 14px; color: #444444; font-weight: bold; margin-right: 5px; }
      .text { font-size: 14px; font-weight: bold; color: #444444; }
    }
    .app-manager-li-active {
      background: #E6A23C;
      i {color: #ffffff;}
      .text { color: #ffffff; }
    }
  }
}
</style>
