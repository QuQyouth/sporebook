import dayjs from "dayjs";
import { defineComponent, reactive, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import s from './ItemList.module.scss';
import { ItemSummary } from "./ItemSummary";
export const ItemList = defineComponent({
    setup: (props,context) => {
        const refSelected = ref('本月')
        const customTime = reactive([])
        const timeList = [
            {start: dayjs().startOf('month').format(), end: dayjs().endOf('month').format()}, //本月
            {start: dayjs().add(-1, 'month').startOf('month').format(), end: dayjs().add(-1, 'month').endOf('month').format()}, //上月
            {start: dayjs().startOf('year').format(), end: dayjs().endOf('year').format()}, //本年
            {start: dayjs().format(), end: dayjs().format()} //自定义
        ]
        return () => (
            <MainLayout>
                {{
                    title: '孢子记账',
                    icon: () => <Icon name="menu"/>,
                    default: () => (
                        <Tabs v-model:selected={refSelected.value}>
                            <Tab name="本月" class={s.tags_wrapper}>
                                <ItemSummary startDate={timeList[0].start} endDate={timeList[0].end}/>
                            </Tab>
                            <Tab name="上个月" class={s.tags_wrapper}>
                                <ItemSummary startDate={timeList[0].start} endDate={timeList[0].end}/>
                            </Tab>
                            <Tab name="今年" class={s.tags_wrapper}>
                                <ItemSummary startDate={timeList[0].start} endDate={timeList[0].end}/>
                            </Tab>
                            <Tab name="自定义" class={s.tags_wrapper}>
                                <ItemSummary startDate={timeList[0].start} endDate={timeList[0].end}/>
                            </Tab>
                        </Tabs>
                    )
                }}
            </MainLayout>
        )
    }
})