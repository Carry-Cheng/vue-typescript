import { Music } from '@/td/types.d'

export declare interface RootState {}

export declare interface MusicState {
  cacheMusicPlayer: Music[]
  cacheMusicPlayerMap: Map<number, Music>
  musicPlayerHelper: number
}
