<template>
  <div class="manager-singer-create">
    <el-form ref="form"
      label-width="100px"
      :model="form" :rules="rules" class="form-create">
      <el-form-item label="歌手名" prop="name">
        <el-input class="form-value-width" clearable v-model="form.name" placeholder="歌手名"
          maxlength="32"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex" fill="#E6A23C">
          <el-radio-button :label="1">男</el-radio-button>
          <el-radio-button :label="2">女</el-radio-button>
          <el-radio-button :label="0">组合</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="国籍" prop="country">
        <el-input class="form-value-width" clearable v-model="form.country" placeholder="国籍"
          maxlength="16"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="歌手简介" prop="info">
        <el-input class="form-value-width-textarea" type="textarea"
          :rows="4" clearable v-model="form.info" placeholder="歌手简介"
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
  name: 'ManagerSingerCreate',
  data() {
    return {
      loading: false,
      form: {
        name: '',
        sex: 1,
        country: '',
        info: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入歌手名', trigger: 'blur' },
          { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          Post('createSinger', this.form)
          .then(res => {
            let { code, data, message } = res
            this.loading = false
            if (code === 200) {
              this.$router.push('/manager/singer')
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
.manager-singer-create {
  .form-create {
    padding: 0;
    .form-value-width { width: 348px; }
    .form-value-width-textarea { width: 600px; }
  }
}
</style>
