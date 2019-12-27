import ProxyHandler from '@/core/proxy'
import { Music } from '@/td/types'
import { Get } from '@/api/http'
import { PlayStatus } from '@/enum/global'
import { Watch } from '@/core/decorator'
import ElementUI from 'element-ui'

class Player {

  isEnd: boolean = false
  isLoaded: boolean = false
  playStatus: number = PlayStatus.whole
  decodeDataMap: Map<number, AudioBuffer> = new Map<number, AudioBuffer>()
  playList: Array<Music> = []
  playListMap: Map<number, Music> = new Map<number, Music>()
  currentPlayInfo: Music | undefined = undefined
  private readonly audioContext: AudioContext
  private bufferSource: AudioBufferSourceNode
  private readonly analyser: AnalyserNode
  private readonly distortion: WaveShaperNode
  private readonly gainNode: GainNode
  private readonly biquadFilter: BiquadFilterNode

  constructor () {
    this.audioContext = new AudioContext()
    this.bufferSource = this.audioContext.createBufferSource()
    this.analyser = this.audioContext.createAnalyser()
    this.distortion = this.audioContext.createWaveShaper()
    this.gainNode = this.audioContext.createGain()
    this.biquadFilter = this.audioContext.createBiquadFilter()
  }

  // @Watch('isEnd', {immediate: true})
  @Watch('isEnd')
  onChangeIsEnd(value: boolean) {
    console.info('onChangeIsEnd', value)
    if (value) {
      console.info(value)
      // this.handlePlay()
    }
  }

  getPlayList (): Array<Music> {
    console.info('getPlayList')
    return this.playList
  }

  getBufferSource (): AudioBufferSourceNode {
    return this.bufferSource
  }

  getContextState (): string {
    return this.bufferSource.context.state
  }

  getAudioDuration (): number {
    if (this.bufferSource.buffer) {
      return Math.floor(this.bufferSource.buffer.duration)
    } else {
      return 0
    }
  }

  getAudioCurrentTime (): number {
    if (this.bufferSource.context.currentTime) {
      return Math.round(this.bufferSource.context.currentTime)
    } else {
      return 0
    }
  }

  play (id: number, offset: number = 0) {
    if (this.playListMap.has(id)) {
      this.currentPlayInfo = this.playListMap.get(id)
    }
    if (this.decodeDataMap.has(id)) {
      this.bufferSource = this.audioContext.createBufferSource()
      this.bufferSource.buffer = this.decodeDataMap.get(id) || null
      this.bufferSource.connect(this.audioContext.destination)
      this.audioContext.resume()
      this.bufferSource.start(0, offset)
    }
  }

  stop () {
    console.info('stop')
    if (this.bufferSource.context.state === 'running') {
      this.bufferSource.stop()
      this.audioContext.suspend()
    }
  }

  autoSetPlayStatus (playStatus: number) {
    switch (playStatus) {
      case PlayStatus.whole:
        this.playStatus = PlayStatus.whole
        break
      case PlayStatus.random:
        this.playStatus = PlayStatus.random
        break
      case PlayStatus.single:
        this.playStatus = PlayStatus.single
        break
      default:
        this.playStatus = PlayStatus.single
        break
    }
  }

  private handlePlay() {
    console.info('play end.')
    console.info(`current play status: ${this.playStatus}`)
    console.info(this.currentPlayInfo)
    switch (this.playStatus) {
      case PlayStatus.whole:
        this.playStatus = PlayStatus.whole
        break
      case PlayStatus.random:
        this.playStatus = PlayStatus.random
        break
      case PlayStatus.single:
        this.playStatus = PlayStatus.single
        break
      default:
        this.playStatus = PlayStatus.single
        break
    }
  }

  loadSource (music: Music): void {
    this.isLoaded = false
    this.stop()
    this.currentPlayInfo = music
    // cache
    if (this.decodeDataMap.has(music.id)) {
      this.bufferSource = this.audioContext.createBufferSource()
      this.bufferSource.buffer = this.decodeDataMap.get(music.id) || null
      this.bufferSource.connect(this.audioContext.destination)
      this.bufferSource.start(0)
      if (this.getContextState() === 'suspended') {
        this.audioContext.resume()
      }
      setTimeout(() => {
        this.isLoaded = true
      }, 0)
    } else {
      Get('getMusicSourceById', { params: {sourceId: music.sourceId} }).then((res: any) => {
        let { code, data, message } = res
        if (code === 200) {
          let stream = data.data
          let stremArray = stream.data
          let streamUint8Array = new Uint8Array(stremArray)
          let streamArrayBuffer = streamUint8Array.buffer
          this.bufferSource = this.audioContext.createBufferSource()
          this.audioContext.decodeAudioData(streamArrayBuffer).then(decodeData => {
            this.isLoaded = true
            this.bufferSource.buffer = decodeData
            this.bufferSource.connect(this.audioContext.destination)
            this.bufferSource.start(0)
            if (this.getContextState() === 'suspended') {
              this.audioContext.resume()
            }
            this.decodeDataMap.set(music.id, decodeData)
            this.playList.push(music)
            this.playListMap.set(music.id, music)
          })
        } else {
          ElementUI.Message(message)
        }
      }).catch(error => {
        ElementUI.Message(error)
      })
    }
    
  }

}

export default ProxyHandler.createProxy(new Player()) as Player
