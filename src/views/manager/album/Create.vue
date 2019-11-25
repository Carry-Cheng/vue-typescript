<template>
  <div class="manager-album-create">
    <el-form ref="form"
      label-width="100px"
      :inline="true" :model="form" :rules="rules" class="form-create">
      <el-form-item label="歌曲名" prop="name">
        <el-input class="form-value-width" clearable v-model="form.name" placeholder="歌曲名"></el-input>
      </el-form-item>
      <el-form-item label="歌手" prop="singer">
        <el-input class="form-value-width" clearable v-model="form.singer" placeholder="歌手"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="作曲人" prop="composer">
        <el-input class="form-value-width" clearable v-model="form.composer" placeholder="作曲人"></el-input>
      </el-form-item>
      <el-form-item label="作词人" prop="lyricist">
        <el-input class="form-value-width" clearable v-model="form.lyricist" placeholder="作词人"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="专辑" prop="albumId">
        <el-input class="form-value-width" clearable v-model="form.albumId" placeholder="专辑"></el-input>
      </el-form-item>
      <el-form-item label="发行日期" prop="issueTime">
        <el-date-picker
          v-model="form.issueTime"
          type="date"
          class="form-value-width-date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <br>
      <el-form-item label=" ">
        <el-button
          type="warning"
          icon="el-icon-upload"
          @click="handleSubmit()"
        >
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'ManagerAlbumCreate',
  data() {
    return {
      form: {
        name: '',
        singer: '',
        composer: '',
        lyricist: '',
        albumId: '',
        issueTime: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入歌曲名称', trigger: 'blur' },
          { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
        ],
        singer: []
      }
    }
  },
  methods: {
    handleSubmit() {
      console.info('submit')
      this.$refs['form'].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.manager-album-create {
  .form-create {
    padding: 0;
    .form-value-width { width: 248px; }
    .form-value-width-date { width: 148px; }
  }
}
</style>
