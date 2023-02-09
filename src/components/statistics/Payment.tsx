import { computed, defineComponent, PropType, reactive } from 'vue';
import s from './Payment.module.scss';
export const Payment = defineComponent({
  props: {
    ItemList: {
      type: Array as PropType<HashMap[]>,
      require: true
    },
  },
  setup: (props, context) => {
    const data = reactive([
      { tag: { id: 1, name: '房租', sign: 'x' }, amount: 3000 },
      { tag: { id: 2, name: '吃饭', sign: 'x' }, amount: 1000 },
      { tag: { id: 3, name: '娱乐', sign: 'x' }, amount: 900 },
    ])
    const processData = computed(() => {
      const total = props.ItemList!.reduce((sum, item) => sum + item.value, 0)
      return props.ItemList!.map(item => ({
        ...item,
        percent: Math.round(item.value / total * 100) + '%'
      }))
    })
    return () => (
      <div class={s.wrapper}>
          {processData.value.map(({ name, value, percent }) => {
            return (
              <div class={s.topItem}>
                <div class={s.sign}>
                  {'\ud83d\udea9'}
                </div>
                <div class={s.bar_wrapper}>
                  <div class={s.bar_text}>
                    <span> {name} -- {percent} </span>
                    <span class={s.amount}> ￥{value} </span>
                  </div>
                  <div class={s.bar}>
                    <div class={s.bar_inner} style={{width: `${percent}`}}></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
    )
  }
})