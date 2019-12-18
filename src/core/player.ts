
export default class Player {

  static instance: Player | null | undefined

  // singleton mode
  static getInstance (): Player {
    if (!this.instance) {
      this.instance = new Player()
    }
    return this.instance
  }

  isLoading: boolean = false
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

  getBufferSource (): AudioBufferSourceNode {
    return this.bufferSource
  }

  play () {
    this.bufferSource.start()
  }

  stop () {
    this.bufferSource.stop()
  }

  loadSourceStream (stream: any) {
    this.isLoading = true
    let stremArray = stream.data
    let streamUint8Array = new Uint8Array(stremArray)
    let streamArrayBuffer = streamUint8Array.buffer
    this.bufferSource = this.audioContext.createBufferSource()
    this.audioContext.decodeAudioData(streamArrayBuffer).then(decodeData => {
      this.isLoading = false
      this.bufferSource.buffer = decodeData
      this.bufferSource.connect(this.audioContext.destination)
      this.bufferSource.start()
    })
  }

}
