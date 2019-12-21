export declare interface Music {
  id: number
  sourceId: number
  musicName?: string
  singerId?: number
  singerName?: string
  albumId?: number
  albumName?: string
  hot?: number
  star?: number
}

export declare interface MusicMap {
  [propName: number]: Music
}

export declare interface MusicDecodeDataMap {
  [propName: number]: AudioBuffer
}

