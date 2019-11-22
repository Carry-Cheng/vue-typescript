<template>
  <div class="manager-music-index">
    <div class="group-btns">
      <el-button
        type="warning"
        icon="el-icon-circle-plus-outline"
        @click="newCreate()"
      >
        新增音乐
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
        label="歌曲名"
        width="250">
      </el-table-column>
      <el-table-column
        prop="singer"
        label="歌手"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="专辑">
      </el-table-column>
      <el-table-column
        prop="address"
        label="发行时间">
      </el-table-column>
      <el-table-column
        label="操作">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: 'ManagerMusicIndex',
  data() {
    return {
      table: []
    }
  },
  methods: {
    newCreate() {
      this.$router.push('/manager/music/new')
    }
  }
}
</script>

<style lang="less" scoped>
.manager-music-index {
  .group-btns { margin-bottom: 15px; }
  .table {}
}
</style>
