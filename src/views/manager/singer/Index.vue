<template>
  <div class="manager-singer-index">
    <div class="filter">
      <div class="filter-item">
        <div class="filter-value">
          <el-input clearable v-model="keyword" placeholder="歌手名"></el-input>
        </div>
      </div>
      <div class="filter-item">
        <el-button type="primary" icon="el-icon-search" @click="queryTools()">查询</el-button>
      </div>
      
    </div>
    <div class="group-btns">
      <el-button
        type="warning"
        icon="el-icon-circle-plus-outline"
        @click="newCreate()"
      >
        新增歌手
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
        prop="id"
        label="歌手ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="歌手名"
        width="250">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="歌手性别"
        width="100">
      </el-table-column>
      <el-table-column
        prop="country"
        label="国籍">
      </el-table-column>
      <el-table-column
        label="操作">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { Get } from '@/api/http'
export default {
  name: 'ManagerSingerIndex',
  data() {
    return {
      keyword: '',
      table: []
    }
  },
  mounted() {
    this.queryTools()
  },
  methods: {
    newCreate() {
      this.$router.push('/manager/singer/new')
    },
    queryTools () {
      let params = {}
      params.keyword = this.keyword
      Get('getSinger', { params }).then(result => {
        console.info(result)
        this.table = result.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.manager-singer-index {
  .filter {
    margin-bottom: 15px;
    .filter-item {
      display: inline-block; vertical-align: middle; margin-right: 15px;
      .filter-label {
        display: inline-block; vertical-align: middle;
        text-align: right; font-size: 14px; font-weight: 400; color: #999999;
      }
      .filter-value {
        display: inline-block; vertical-align: middle;
        width: 200px;
      }
    }
  }
  .group-btns { margin-bottom: 15px; }
  .table {}
}
</style>
