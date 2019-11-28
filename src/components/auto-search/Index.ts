const SingerAutoSearch =  require('@/components/auto-search/SingerAutoSearch')
export default {
  name: 'xc-auto-search',
  model: {
    props: 'value',
    event: 'change'
  },
  props: {
    value: '',
    type: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  render(h: any) {
    let self: any = this
    let $props = self.$props
    let $type = $props.type
    let baseComponent = null
    switch ($type) {
      case 'singer':
        baseComponent = SingerAutoSearch.default
        break
      default:
        break
    }
    return h(
      baseComponent,
      {
        props: $props,
        on: {
          change(id: any) {
            self.$emit('change', id)
          }
        }
      }
    )
  }
}
