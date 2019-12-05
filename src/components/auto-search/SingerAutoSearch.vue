<template>
  <base-auto-search
    :placeholder="placeholder"
    :clearable="clearable"
    @remoteMethod="querySearchAsync"
    @change="handleSelect"
    @clear="handleClear()"
  >
    <div slot="content">
      <el-option
        v-for="(v, index) in options"
        :key="index"
        :label="v.name"
        :value="v.id">
      </el-option>
    </div>
  </base-auto-search>
</template>
<script>
import { Get } from '@/api/http'
import BaseAutoSearch from '@/components/auto-search/BaseAutoSearch'
export default {
  name: 'SingerAutoSearch',
  components: { BaseAutoSearch },
  props: {
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      options: []
    }
  },
  methods: {
    querySearchAsync(queryString) {
      if (!queryString) {
        this.options = []
      } else {
        let params = {}
        params.keyword = queryString
        Get('searchSinger', {params}).then(res => {
          let { code, data, message } = res
          if (code === 200) {
            this.options = data
          } else {
            this.options = []
            this.$message.warning(message)
          }
        }).catch(error => {
          this.options = []
          this.$message.warning(error)
        })
      }
    },
    handleSelect(id) {
      this.$emit('change', id)
    },
    handleClear() {
      this.$emit('change', '')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
