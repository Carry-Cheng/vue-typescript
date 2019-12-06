<template>
  <div class="manager-music-upload">
    <h3 class="upload-h3">{{ titleH1 }}</h3>
    <h5 class="upload-h4">上传音乐</h5>
    <el-upload
      class="upload-demo"
      drag
      action="/api/v1/manager/upload/uploadMusic"
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
      action="/api/v1/manager/upload/music"
      multiple>
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
  get titleH1() {
    return `${this.titleName} - ${this.singerName}`
  }
  created() {
    console.info(this.$route)
    let query: any = this.$route.query
    let { name, singerName } = query
    this.titleName = name
    this.singerName = singerName
  }

  uploadMusicSuccess (response: any) {
    console.info(response)
  }

  uploadMusicError (response: any) {
    console.info(response)
  }

}
</script>

<style lang="less" scoped>
.manager-music-upload {
  .upload-h3 {margin: 0;}
  .upload-h4 {margin: 5px;}
}
</style>
