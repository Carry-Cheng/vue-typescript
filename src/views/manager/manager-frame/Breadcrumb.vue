<template>
  <div class="app-manager-breadcrumb">
    <el-breadcrumb class="custom-breadcrumb" separator="/">
      <template v-for="(v, index) in breadcrumbs">
        <el-breadcrumb-item
          v-if="index !== breadcrumbs.length - 1" :key="index"
          :to="v.path"
        >
          {{ v.title }}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-else :key="index">
          {{ v.title }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
import router from '@/router/manager-router'
export default {
  name: 'AppManagerBreadcrumb',
  data() {
    return {
      breadcrumbs: []
    }
  },
  watch: {
    $route(route) {
      this.initBreadcrumbs(route.path)
    }
  },
  created () {
    this.initBreadcrumbs(this.$route.path)
  },
  methods: {
    initBreadcrumbs(currentPath) {
      this.breadcrumbs = []
      if (router.children) {
        router.children.forEach((element, index) => {
          // find
          if (currentPath.indexOf(element.path) > -1) {
            this.breadcrumbs.push({
              path: element.path,
              title: element.mate.title || '未知'
            })
            if (element.children) {
              element.children.forEach(child => {
                if (currentPath === child.path) {
                  this.breadcrumbs.push({
                    path: child.path,
                    title: child.mate.title || '未知'
                  })
                }
              })
            }
          }
        })
      }
      // console.info(this.breadcrumbs)
    }
  }
}
</script>

<style lang="less" scoped>
.app-manager-breadcrumb {
  min-width: 748px;
  position: fixed; top: 58px; left: 190px; width: calc(100% - 200px); height: 28px;
  z-index: 100; background: #ffffff; box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  .custom-breadcrumb {
    line-height: 28px; padding-left: 10px;
  }
}
</style>