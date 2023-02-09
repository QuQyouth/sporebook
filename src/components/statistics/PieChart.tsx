import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import s from './PieChart.module.scss';
import * as echarts from 'echarts'

const option = {
  title: {
    // text: props.kind,
    left: 'center',
    top: 'center'
  },
  series: [
    {
      type: 'pie',
      // data: showList,
      radius: ['40%', '70%']
    }
  ]
}

export const PieChart = defineComponent({
  props: {
    kind:{
      type: String,
      require: true
    },
    expenditurePieData: {
      type: Array as PropType<HashMap[]>,
      require: true
    },
    incomePieData:{
      type: Array as PropType<HashMap[]>,
      require: true
    }
  },
  setup: (props,context) => {
    const refPieChart = ref<HTMLDivElement>()

    let myPieChart:any = undefined

    onMounted(() => {
        if(refPieChart.value === undefined) { return }
        myPieChart = echarts.init(refPieChart.value)
        
        myPieChart.setOption(option)
    })

    // 从父组件通过props传给子组件的值是异步获取的，而子组件是在父组件渲染的时候就已经渲染好了的
    // 这样会导致props的值未定义, 需要使用watch监听
    watch(()=> [props.expenditurePieData, props.incomePieData, props.kind], () => {
      myPieChart?.setOption({
        title: {text: props.kind},
        series: [{
          data: props.kind === '支出' ? props.expenditurePieData : props.incomePieData
        }]
      })
    })

    return () => (
        <div ref={refPieChart} class={s.pieChart}></div>
    )
  }
})