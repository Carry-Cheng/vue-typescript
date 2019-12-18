import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './types.d'
import { musicStore } from './modules/music.store'
Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  modules: {
    musicStore
  }
}

export default new Vuex.Store(store)
