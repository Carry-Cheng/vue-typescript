<template>
  <div class="manager-music-create">
    <el-form ref="form"
      label-width="100px"
      :inline="true" :model="form" :rules="rules" class="form-create">
      <el-form-item label="歌曲名" prop="name">
        <el-input class="form-value-width" clearable v-model="form.name" placeholder="歌曲名"></el-input>
      </el-form-item>
      <el-form-item label="歌手" prop="singerId">
        <xc-auto-search
          v-model="form.singerId"
          class="form-value-width"
          type="singer"
          placeholder="请输入歌手ID,名称"
        ></xc-auto-search>
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
        <xc-auto-search
          v-model="form.albumId"
          class="form-value-width"
          type="album"
          placeholder="请输入专辑ID,名称"
        ></xc-auto-search>
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
          :disabled="loading"
          @click="handleSubmit()"
        >
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Model, Prop } from 'vue-property-decorator'
import { Post } from '@/api/http'
@Component({
  name: 'ManagerMusicCreate'
})
export default class ManagerMusicCreate extends Vue {
  private loading: boolean = false
  private form: any = {
    name: undefined,
    singerId: undefined,
    composer: undefined,
    lyricist: undefined,
    albumId: undefined,
    issueTime: undefined
  }
  private rules: any = {
    name: [
      { required: true, message: '请输入歌曲名称', trigger: 'blur' },
      { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
    ]
  }

  handleSubmit() {
    let refsForm: any = this.$refs['form']
    refsForm.validate((valid: any) => {
      if (valid) {
        this.loading = true
        Post('createMusicInfo', this.form)
        .then((res: any) => {
          let { code, data, message } = res
          this.loading = false
          if (code === 200) {
            this.$router.push('/manager/music')
          } else {
            this.$message.error(message)
          }
        }).catch(error => {
          this.loading = false
          this.$message.error(error)
        })
      }
    })
  }
}
</script>

<style lang="less" scoped>
.manager-music-create {
  .form-create {
    padding: 0;
    .form-value-width { width: 248px; }
    .form-value-width-date { width: 148px; }
  }
}
</style>
