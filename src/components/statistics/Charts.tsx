import { Tab, Tabs } from "../../shared/Tabs";
import { computed, defineComponent, onMounted, PropType, ref, watch } from "vue";
import s from './Charts.module.scss';

import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import { Payment } from "./Payment";
import { defaultHttpClient } from "../../shared/HttpClient";
import { DivideGroup, handleData } from "../../shared/DivideGroup";
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
        const expenditureItemList = ref<ItemFormDate[]>([])
        const incomeItemList = ref<ItemFormDate[]>([])

        const expenditureClassification = ref<HashMap[]>([])
        const incomeClassification = ref<HashMap[]>([])

        const getItemsData = async () => {
            const result:any = await defaultHttpClient.get("/getItemList")
            ItemList.value = result.data.ItemList
            expenditureItemList.value = DivideGroup(ItemList.value, "kind")[0]
            incomeItemList.value = DivideGroup(ItemList.value, "kind")[1]

            expenditureClassification.value = handleData(expenditureItemList.value, "name", "amount")
            incomeClassification.value = handleData(incomeItemList.value, "name", "amount")
            console.log(incomeClassification.value)

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