import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import s from './LineChart.module.scss';
import * as echarts from 'echarts';
import { ItemData } from "./ItemDate";
const option = {
  xAxis: {
    data: ['1', '5', '10', '15', '20', '25']
  },
  yAxis: {},
  series: [
    {
      type: 'line'
    }
  ]
}
export const LineChart = defineComponent({
  props: {
    expenditureLineData: {
      type: Array as PropType<String[]>,
      required: true
    },
    incomeLineData: {
      type: Array as PropType<String[]>,
      required: true,
    },
  },
  setup: (props,context) => {
      
      const refLineChart = ref<HTMLDivElement>() 
      let myLineChart:any = undefined
      const option = {
        xAxis: {
          data: ['1', '5', '10', '15', '20', '25']
        },
        yAxis: {},
      };
      onMounted(() => {
        if(refLineChart.value === undefined) { return }
        const sortDateTime = (a:string,b:string) =>{
          return Date.parse(a) - Date.parse(b)
        }

        const refMonths = ItemData.map((item)=>{
          return Object.assign({},{'time': item.time})
        })

        myLineChart = echarts.init(refLineChart.value)
        
        myLineChart.setOption(option)
      }) 
      watch(()=>[props.expenditureLineData, props.incomeLineData],()=>{
        myLineChart.setOption({
          series: [
            {
              data: props.expenditureLineData,
              type: 'line',
              areaStyle: {
                normal:{
                  opacity: 0.5
                }
              }
            },
            {
              data: props.incomeLineData,
              type: 'line',
              areaStyle: {
                normal:{
                  color: '#517b5f',
                  opacity: 0.5
                }
              }
            }
          ]
        })
      })
      return () => (
        <div ref={refLineChart} class={s.lineChart}></div>
      )
  }
})