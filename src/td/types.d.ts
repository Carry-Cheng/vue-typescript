
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

export declare interface WatchConfig {
  immediate: boolean
}

export declare interface WatchProxyMap {
  name: string,
  handler: Function
  config: WatchConfig
}


