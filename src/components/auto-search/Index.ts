
export default {
  name: 'xc-auto-search',
  model: {
    props: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  render(h: any) {
    let VueAutoSearch: any = this
    return h(
      'div',
      {
        props: VueAutoSearch.$props
      }
    )
  }
}
