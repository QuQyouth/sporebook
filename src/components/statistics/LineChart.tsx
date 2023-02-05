import { defineComponent, onMounted, PropType, ref } from "vue";
import s from './LineChart.module.scss';
import * as echarts from 'echarts'
import { ItemData } from "./ItemDate";
export const LineChart = defineComponent({
    setup: (props,context) => {
        
        const refLineChart = ref<HTMLDivElement>() 
        onMounted(() => {
            if(refLineChart.value === undefined) { return }
            const sortDateTime = (a:string,b:string) =>{
              return Date.parse(a) - Date.parse(b)
            }

            const refMonths = ItemData.map((item)=>{
              return Object.assign({},{'time': item.time})
            })
            console.log(refMonths);
            


            var myLineChart = echarts.init(refLineChart.value)
            const option = {
                xAxis: {
                  data: ['A', 'B', 'C', 'D', 'E']
                },
                yAxis: {},
                series: [
                  {
                    data: [10, 22, 28, 23, 19],
                    type: 'line',
                    areaStyle: {}
                  },
                  {
                    data: [25, 14, 23, 35, 10],
                    type: 'line',
                    areaStyle: {
                      color: '#ff0',
                      opacity: 0.5
                    }
                  }
                ]
            };
            myLineChart.setOption(option)
        }) 
        return () => (
            <div ref={refLineChart} class={s.lineChart}></div>
        )
    }
})