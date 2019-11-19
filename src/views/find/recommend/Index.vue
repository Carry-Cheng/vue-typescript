<template>
  <div class="app-find-recommend">
    AppFindRecommend
  </div>
</template>

<script>
import { Get } from '@/api/http'
export default {
  name: 'AppFindRecommend',
  data() {
    return {
      
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      Get('recommendList').then(result => {
        console.info(result)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.app-find-recommend {
  
}
</style>
