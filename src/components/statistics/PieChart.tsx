import { defineComponent, onMounted, ref } from "vue";
import s from './PieChart.module.scss';
import * as echarts from 'echarts'
export const PieChart = defineComponent({
    setup: (props,context) => {
        const refPieChart = ref<HTMLDivElement>()
        onMounted(() => {
            if(refPieChart.value === undefined) { return }
            var myPieChart = echarts.init(refPieChart.value)
            const option = {
                title: {
                  text: '总支出',
                  left: 'center',
                  top: 'center'
                },
                series: [
                  {
                    type: 'pie',
                    data: [
                      {
                        value: 335,
                        name: 'A'
                      },
                      {
                        value: 234,
                        name: 'B'
                      },
                      {
                        value: 1548,
                        name: 'C'
                      }
                    ],
                    radius: ['40%', '70%']
                  }
                ]
            };
            myPieChart.setOption(option)
        })
        return () => (
            <div ref={refPieChart} class={s.pieChart}></div>
        )
    }
})