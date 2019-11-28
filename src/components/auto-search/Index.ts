
import { Vue, Component, Model, Prop } from 'vue-property-decorator'
import SingerAutoSearch from '@/components/auto-search/SingerAutoSearch.vue'
@Component({
  name: 'xc-auto-search'
})
export default class XcAutoSearch extends Vue {
  @Model('change') readonly value: any
  @Prop(String) readonly type!: string
  @Prop({default: '请输入内容'}) readonly placeholder!: string
  @Prop({type: Boolean, default: true}) readonly clearable!: boolean
  render(h: any) {
    let baseComponent = null
    if (this.type === 'singer') baseComponent = SingerAutoSearch
    return h(
      baseComponent,
      {
        props: this.$props,
        on: {
          change: (value: any) => {
            this.$emit('change', value)
          }
        }
      }
    )
  }
}
