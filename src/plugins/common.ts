import Vue from 'vue'
const XcAutoSearch = require('@/components/auto-search/Index')
const commonComponents = {
  install() {
    Vue.component('xc-auto-search', XcAutoSearch)
  }
}

Vue.use(commonComponents)
