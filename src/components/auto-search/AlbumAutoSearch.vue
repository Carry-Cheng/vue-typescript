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
<script lang="ts">
import { Vue, Component, Model, Prop } from 'vue-property-decorator'
import { Get } from '@/api/http'
import BaseAutoSearch from '@/components/auto-search/BaseAutoSearch.vue'
@Component({
  name: 'AlbumAutoSearch',
  components: { BaseAutoSearch }
})
export default class AlbumAutoSearch extends Vue {
  @Prop(String) readonly placeholder!: string
  @Prop(Boolean) readonly clearable!: boolean
  private options: Array<any> = []
  querySearchAsync(queryString: any) {
    if (!queryString) {
      this.options = []
    } else {
      let params: any = {}
      params.keyword = queryString
      Get('searchAlbum', {params}).then((res: any) => {
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
  }
  handleSelect(id: any) {
    this.$emit('change', id)
  }
  handleClear() {
    this.$emit('change', '')
  }
}
</script>

<style lang="less" scoped>

</style>
