import { defineComponent, onMounted, ref } from "vue";
import s from './LineChart.module.scss';
import * as echarts from 'echarts'
export const LineChart = defineComponent({
    setup: (props,context) => {
        const refLineChart = ref<HTMLDivElement>() 
        onMounted(() => {
            if(refLineChart.value === undefined) { return }
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