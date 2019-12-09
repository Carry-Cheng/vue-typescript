<template>
  <div class="manager-music-upload">
    <h3 class="upload-h3">{{ titleH1 }}</h3>
    <h5 class="upload-h4">上传音乐</h5>
    <el-upload
      class="upload-demo"
      drag
      :data="uploadParams"
      action="/api/v1/manager/upload/music"
      :on-success="uploadMusicSuccess"
      :on-error="uploadMusicError"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传mp3文件，且不超过50M</div>
    </el-upload>
    <h5 class="upload-h4">上传歌词</h5>
    <el-upload
      class="upload-demo"
      drag
      :data="uploadParams"
      action="/api/v1/manager/upload/lyric"
      :on-success="uploadMusicSuccess"
      :on-error="uploadMusicError"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传lrc文件，且不超过1M</div>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Model, Prop } from 'vue-property-decorator'
import { Post } from '@/api/http'
@Component({
  name: 'ManagerMusicUpload'
})
export default class ManagerMusicUpload extends Vue {
  private titleName: string = ''
  private singerName: string = ''
  private uploadParams: any = {
    id: undefined,
    sourceId: undefined
  }
  get titleH1() {
    return `${this.titleName} - ${this.singerName}`
  }
  created() {
    let query: any = this.$route.query
    let { name, singerName, id, sourceId } = query
    this.titleName = name
    this.singerName = singerName
    this.uploadParams.id = id
    this.uploadParams.sourceId = sourceId
  }

  uploadMusicSuccess (response: any) {
    let { code, message } = response
    if (code === 200) {
      this.$message.success('上传成功')
    } else {
      this.$message.error(message)
    }
  }

  uploadMusicError (error: any) {
    let response = JSON.parse(error.message)
    if (response) {
      this.$message.error(response.message)
    }
  }

}
</script>

<style lang="less" scoped>
.manager-music-upload {
  .upload-h3 {margin: 0;}
  .upload-h4 {margin: 5px;}
}
</style>
