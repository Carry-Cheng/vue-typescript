import Vue from 'vue'
import XcAutoSearch from '@/components/auto-search/Index'
const commonComponents = {
  install() {
    Vue.component('xc-auto-search', XcAutoSearch)
  }
}

Vue.use(commonComponents)
