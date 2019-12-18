import { Music, MusicMap } from '@/td/types.d'

export declare interface RootState {}

export declare interface MusicState {
  cacheMusicPlayer: Music[]
  cacheMusicPlayerMap: MusicMap
  musicPlayerHelper: number
}
