<template>
  <div class="manager-album-create">
    <el-form ref="form"
      label-width="100px"
      :model="form" :rules="rules" class="form-create">
      <el-form-item label="专辑名" prop="albumName">
        <el-input class="form-value-width" clearable v-model="form.albumName" placeholder="专辑名"
          maxlength="32"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="歌手" prop="singerId">
        <xc-auto-search
          v-model="form.singerId"
          type="singer"
          placeholder="请输入歌手ID,名称"
        ></xc-auto-search>
      </el-form-item>
      <el-form-item label="发布日期" prop="publishTime">
        <el-date-picker
          v-model="form.publishTime"
          type="date"
          class="form-value-width-date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="专辑简介" prop="albumInfo">
        <el-input class="form-value-width-textarea" type="textarea"
          :rows="5" clearable v-model="form.albumInfo" placeholder="专辑简介"
          maxlength="255"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button
          type="warning"
          icon="el-icon-upload"
          :disabled="loading"
          @click="handleSubmit()"
        >
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Post } from '@/api/http'
export default {
  name: 'ManagerAlbumCreate',
  data() {
    return {
      loading: false,
      form: {
        albumName: '',
        singerId: '',
        publishTime: '',
        albumInfo: ''
      },
      rules: {
        albumName: [
          { required: true, message: '请输入专辑名称', trigger: 'blur' },
          { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
        ],
        singerId: [
          { required: true, message: '请选择歌手', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          Post('createAlbum', this.form)
          .then(res => {
            let { code, data, message } = res
            this.loading = false
            if (code === 200) {
              this.$router.push('/manager/album')
            } else {
              this.$message.error(message)
            }
          }).catch(error => {
            this.loading = false
            this.$message.error(error)
          })
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
