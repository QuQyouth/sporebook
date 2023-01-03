import { Tab, Tabs } from "../../shared/Tabs";
import { defineComponent, onMounted, PropType, ref } from "vue";
import s from './Charts.module.scss';

import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import { Payment } from "./Payment";
export const Charts = defineComponent({
    props: {
        startDate: {
            type: String as PropType<string>,
            required: true
        },
        endDate: {
            type: String as PropType<string>,
            required: true
        }
    },
    setup: (props,context) => {    
        
        const refSelected = ref('支出')
        return () => (
            <div class={s.wrapper}>
                <LineChart />
                <PieChart />
                <Payment />
                <div class={s.spendOrIncome}>
                    <Tabs
                        v-model:selected={refSelected.value}
                    >
                        <Tab name="支出" value="支出"></Tab>
                        <Tab name="收入" value="收入"></Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
})