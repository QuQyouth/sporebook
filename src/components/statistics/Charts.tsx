import { Tab, Tabs } from "../../shared/Tabs";
import { computed, defineComponent, onMounted, PropType, ref, watch } from "vue";
import s from './Charts.module.scss';

import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import { Payment } from "./Payment";
import { defaultHttpClient } from "../../shared/HttpClient";
import { handleData } from "../../shared/DivideGroup";
import isBetween from 'dayjs/plugin/isBetween'
import dayjs from "dayjs";
dayjs.extend(isBetween)
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
        const ItemList = ref<ItemFormDate[]>([])

        // const expenditureClassification = ref<HashMap[]>([])
        // const incomeClassification = ref<HashMap[]>([])

        // isBetween处理过的ItemList
        const timeItemList = computed(()=> ItemList.value.filter((item)=>{
            return dayjs(item.time).isBetween(props.startDate, props.endDate)
        }))

        const expenditureItemList = computed(() => timeItemList.value.filter((item)=> item.kind==='expenditure'))
        const incomeItemList = computed(() => timeItemList.value.filter((item)=> item.kind==='income'))

        // 分类后的ItemList
        const expenditureClassification = computed(()=>handleData(expenditureItemList.value, "name", "amount"))
        const incomeClassification = computed(()=>handleData(incomeItemList.value, "name", "amount"))

        const getItemsData = async () => {
            const result:any = await defaultHttpClient.get("/getItemList")
            ItemList.value = result.data.ItemList

            // expenditureClassification.value = handleData(expenditureItemList.value, "name", "amount")
            // incomeClassification.value = handleData(incomeItemList.value, "name", "amount")

        }


        const expenditureLineData = computed<string[]>(()=>
            expenditureItemList.value.map((item)=>{
                // return Object.assign({}, {'amount': item.amount}) //这种方法返回的是一个数组对象
                return item.amount
            }).join(",").split(",")
        )

        const incomeLineData = computed<string[]>(()=>
            incomeItemList.value.map((item)=>{
                // return Object.assign({}, {'amount': item.amount}) //这种方法返回的是一个数组对象
                return item.amount
            }).join(",").split(",")
        )

        
        onMounted(getItemsData)
        watch(() => refSelected.value, getItemsData)
        return () => (
            <div class={s.wrapper}>
                <LineChart 
                    expenditureLineData={expenditureLineData.value}
                    incomeLineData={incomeLineData.value}
                />
                <PieChart 
                    kind={refSelected.value}
                    expenditurePieData={expenditureClassification.value}
                    incomePieData={incomeClassification.value}
                />
                <Payment 
                    ItemList = {refSelected.value === '支出' ? 
                    expenditureClassification.value : incomeClassification.value}
                />
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