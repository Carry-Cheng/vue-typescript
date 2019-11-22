<template>
  <div class="manager-musice-create">
    <el-form ref="form"
      label-width="100px"
      :inline="true" :model="form" :rules="rules" class="form-create">
      <el-form-item label="歌曲名">
        <el-input v-model="form.name" placeholder="歌曲名"></el-input>
      </el-form-item>
      <el-form-item label="歌手">
        <el-input v-model="form.singer" placeholder="歌手"></el-input>
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
  name: 'ManagerMusicCreate',
  data() {
    return {
      form: {
        name: '',
        singer: ''
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
      this.$refs[form].validate((valid) => {
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
.manager-musice-create {
  .form-create {
    padding: 0;
  }
}
</style>
