import { defineComponent, onMounted, PropType, ref } from "vue";
import { RouterLink } from "vue-router";
import { DivideGroup } from "../../shared/DivideGroup";
import { defaultHttpClient } from "../../shared/HttpClient";
import { useMeStore } from "../../stores/useMeStore";
import s from './ItemSummary.module.scss';
export const ItemSummary = defineComponent({
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
        const currentStore = useMeStore()
        const {id} = currentStore
        const ItemList = ref<ItemFormDate[]>([])
        const refExpenditureList = ref<ItemFormDate[]>([])
        const refIncomeList = ref<ItemFormDate[]>([])
        const refTotalExpenditure = ref(0)
        const refTotalIncome = ref(0)

        

        onMounted(async () => {
            const result:any = await defaultHttpClient.get("/getItemList")
            ItemList.value = result.data.ItemList
            
            const groups = DivideGroup(ItemList.value, "kind")
            refExpenditureList.value = groups[0]
            refIncomeList.value = groups[1]
            refTotalExpenditure.value = refExpenditureList.value.reduce((sum, item)=> sum + Number(item.amount), 0)
            refTotalIncome.value = refIncomeList.value.reduce((sum, item)=> sum + Number(item.amount), 0)
        

        });
        return () => (
            <div class={s.wrapper}>
                {props.startDate}至 
                {props.endDate}
                <RouterLink to={`/statistics`}>
                    <ul class={s.total}>
                        <li><span>收入</span><span>{refTotalIncome.value}</span></li>
                        <li class={s.expenditure}><span>支出</span><span>{refTotalExpenditure.value}</span></li>
                        <li><span>净收入</span><span>{refTotalIncome.value - refTotalExpenditure.value}</span></li>
                    </ul>
                </RouterLink>
                <ol class={s.list}>
                    {
                        ItemList.value.map((item)=>{
                            return(
                                <li>
                                    <div class={s.sign}>{item.kind ==="expenditure" ? "\ud83d\ude43" : "\ud83e\udd11"}</div>
                                    <div class={s.tag}>{item.name}</div>
                                    <div class={[s.amount, item.kind === "expenditure" ? s.expenditure : s.income ]}>{item.amount}</div>
                                </li>
                            )
                        })
                    }
                </ol>
            </div>
        )
    }
})