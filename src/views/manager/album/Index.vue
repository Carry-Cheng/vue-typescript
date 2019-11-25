<template>
  <div class="manager-album-index">
    <div class="group-btns">
      <el-button
        type="warning"
        icon="el-icon-circle-plus-outline"
        @click="newCreate()"
      >
        新增专辑
      </el-button>
    </div>
    <!-- table -->
    <el-table
      class="table"
      :data="table"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="专辑ID"
        width="250">
      </el-table-column>
      <el-table-column
        prop="singer"
        label="专辑名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="singer"
        label="专辑关联"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="发布时间">
      </el-table-column>
      <el-table-column
        label="操作">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: 'ManagerAlbumIndex',
  data() {
    return {
      table: []
    }
  },
  methods: {
    newCreate() {
      this.$router.push('/manager/album/new')
    }
  }
}
</script>

<style lang="less" scoped>
.manager-album-index {
  .group-btns { margin-bottom: 15px; }
  .table {}
}
</style>
