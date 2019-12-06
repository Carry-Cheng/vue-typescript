<template>
  <div class="manager-music-index">
    <div class="filter">
      <div class="filter-item">
        <div class="filter-value">
          <el-input clearable v-model="params.keyword" placeholder="歌曲名、歌手名、专辑名"></el-input>
        </div>
      </div>
      <div class="filter-item">
        <el-button type="primary" icon="el-icon-search" @click="queryTools()" :disabled="tableLoading">查询</el-button>
      </div>
    </div>
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
        prop="singerName"
        label="歌手">
      </el-table-column>
      <el-table-column
        prop="albumName"
        label="专辑">
      </el-table-column>
      <el-table-column
        prop="publishTime"
        label="专辑发行时间">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            @click="handleClickUpload(scope.row)"
            type="text">
            上传音乐
          </el-button>
          <el-button
            @click="handleClickUpdate(scope.row)"
            type="text">
            编辑
          </el-button>
          <el-button
            @click="handleClickDelete(scope.row)"
            type="text">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      class="pagination"
      :current-page="params.pageNum"
      :total="params.total"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>


<script lang="ts">
import { Vue, Component, Model, Prop } from 'vue-property-decorator'
import { Get } from '@/api/http'
@Component({
  name: 'ManagerMusicIndex'
})
export default class ManagerMusicIndex extends Vue {
  private tableLoading: boolean = false
  private params: any = {
    keyword: '',
    pageSize: 10,
    pageNum: 1,
    total: 0
  }
  private table: Array<any> = []

  mounted() {
    this.queryTools()
  }

  newCreate() {
    this.$router.push('/manager/music/new')
  }

  handleClickUpload(row: any) {
    this.$router.push({
      path: '/manager/music/upload',
      query: row
    })
  }

  handleClickUpdate(row: any) {
    console.info(row)
    this.$message.warning('暂未开通')
  }

  handleClickDelete(row: any) {
    this.$confirm('此操作将永久删除, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$message.warning('暂未开通')
    }).catch(() => {})
  }

  handleSizeChange (size: number) {
    this.params.pageNum = 1
    this.params.pageSize = size
    this.queryTools()
  }

  handlePageChange (page: number) {
    this.params.pageNum = page
    this.queryTools()
  }

  queryTools () {
    let params: any = {}
    params.keyword = this.params.keyword
    params.pageSize = this.params.pageSize
    params.pageNum = this.params.pageNum
    this.tableLoading = true
    Get('getMusicInfo', { params }).then((res: any) => {
      let { code, data, message } = res
      this.tableLoading = false
      if (code === 200) {
        this.table = data.list
        this.params.total = data.total
      } else {
        this.table = []
        this.params.total = 0
        this.$message.error(message)
      }
    }).catch(error => {
      this.tableLoading = false
      this.$message.error(error)
    })
  }
}
</script>

<style lang="less" scoped>
.manager-music-index {
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
  .table {margin-bottom: 15px;}
  .pagination {text-align: right;}
}
</style>
