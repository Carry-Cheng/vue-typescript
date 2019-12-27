
import { Module, GetterTree, MutationTree, ActionTree } from 'vuex'
import { RootState, MusicState } from '../types.d'
import { Music } from '@/td/types.d'

const state: MusicState = {
  cacheMusicPlayerMap: new Map<number, Music>(),
  cacheMusicPlayer: [],
  musicPlayerHelper: -1
}

const getters: GetterTree<MusicState, RootState> = {
  playerHelper (state: MusicState): Music | undefined {
    return state.cacheMusicPlayerMap.get(state.musicPlayerHelper)
  }
}

const mutations: MutationTree<MusicState> = {
  handleNewest (state: MusicState, music: Music) {
    state.cacheMusicPlayerMap.set(music.id, music)
  },
  immediatelyPlay (state: MusicState, music: Music) {
    state.musicPlayerHelper = music.id
  },
  increase (state: MusicState, music: Music) {
    state.musicPlayerHelper = music.id
  }
}

const actions: ActionTree<MusicState, RootState> = {
  immediatelyPlay ({commit}, music: Music) {
    commit('handleNewest', music)
    commit('immediatelyPlay', music)
  }
}

export const musicStore:Module<MusicState, RootState> = {
  state,
  getters,
  mutations,
  actions
}
