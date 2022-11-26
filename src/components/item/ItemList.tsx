import dayjs from "dayjs";
import { Dialog } from "vant";
import { defineComponent, reactive, ref, watchEffect } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Form, FormItem } from "../../shared/Form";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import s from './ItemList.module.scss';
import { ItemSummary } from "./ItemSummary";
export const ItemList = defineComponent({
    setup: (props, context) => {
        const refSelected = ref('本月')
        const tempTime = reactive({
            start: dayjs().format('YYYY-MM-DD'),
            end: dayjs().format('YYYY-MM-DD')
        })
        const customTime = reactive<{
            start: string
            end: string
        }>({ start: '', end: '' })
        const timeList = [
            { start: dayjs().startOf('month').format('YYYY-MM-DD'), end: dayjs().endOf('month').format('YYYY-MM-DD') }, //本月
            { start: dayjs().add(-1, 'month').startOf('month').format('YYYY-MM-DD'), end: dayjs().add(-1, 'month').endOf('month').format('YYYY-MM-DD') }, //上月
            { start: dayjs().startOf('year').format('YYYY-MM-DD'), end: dayjs().endOf('year').format('YYYY-MM-DD') }, //本年
        ]
        const refOverlayVisible = ref(false)
        const customTimeSelected = () => {
            refOverlayVisible.value = false
            Object.assign(customTime, tempTime)
        }
        const onSelect = (value: string) => {
            if (value === '自定义') {
                refOverlayVisible.value = true
            }
        }
        const cancelCustomTime = () => {
            refOverlayVisible.value = false
            Object.assign(customTime, {start: dayjs().format('YYYY-MM-DD'), end: dayjs().format('YYYY-MM-DD')})
        }
        watchEffect(() => {
            if (refSelected.value === '自定义') {
                refOverlayVisible.value = true
            }
        })
        return () => (
            <MainLayout>
                {{
                    title: '孢子记账',
                    icon: () => <Icon name="menu" />,
                    default: () => (<>
                        <Tabs
                            v-model:selected={refSelected.value}
                            onUpdate:selected={onSelect}
                        >
                            <Tab name="本月" value="本月">
                                <ItemSummary startDate={timeList[0].start} endDate={timeList[0].end} />
                            </Tab>
                            <Tab name="上个月" value="上个月">
                                <ItemSummary startDate={timeList[1].start} endDate={timeList[1].end} />
                            </Tab>
                            <Tab name="今年" value="今年">
                                <ItemSummary startDate={timeList[2].start} endDate={timeList[2].end} />
                            </Tab>
                            <Tab name="自定义" value='自定义'>
                                <ItemSummary startDate={customTime.start} endDate={customTime.end} />
                            </Tab>
                        </Tabs>
                        {/* notice: Dialog 是一个函数，Dialog.Component 才是 Dialog 对应的组件 */}
                        <Dialog.Component
                            show={refOverlayVisible.value}
                            class={s.dialog}
                            show-cancel-button
                            // 这里需要重新写 Form的提交逻辑
                            onConfirm={customTimeSelected}
                            
                            onCancel={cancelCustomTime}
                        >
                            <div class={s.dialog_inner}>
                                <header>
                                    请选择时间
                                </header>
                                <main>
                                    <Form onSubmit={customTimeSelected}>
                                        <FormItem label="开始时间" v-model={tempTime.start} type='date' />
                                        <FormItem label="结束时间" v-model={tempTime.end} type='date' />
                                    </Form>
                                </main>
                            </div>
                        </Dialog.Component>
                    </>)
                }}
            </MainLayout>
        )
    }
})