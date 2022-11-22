import { defineComponent, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from './ItemCreate.module.scss';
export const ItemCreate = defineComponent({
    setup: (props,context) => {
        const refKind = ref('支出')
        const refExpensesTags = ref([
            {id: 1, name: '吃', sign: '￥', category: 'expenses'},
            {id: 1, name: '吃', sign: '￥', category: 'expenses'},
            {id: 1, name: '吃', sign: '￥', category: 'expenses'},
            {id: 1, name: '吃', sign: '￥', category: 'expenses'},
            {id: 1, name: '吃', sign: '￥', category: 'expenses'},
            {id: 1, name: '吃', sign: '￥', category: 'expenses'},
            {id: 1, name: '吃', sign: '￥', category: 'expenses'},
            {id: 1, name: '吃', sign: '￥', category: 'expenses'},
            {id: 1, name: '吃', sign: '￥', category: 'expenses'},
            {id: 1, name: '吃', sign: '￥', category: 'expenses'},
            {id: 1, name: '吃', sign: '￥', category: 'expenses'},
            {id: 1, name: '吃', sign: '￥', category: 'expenses'},
            {id: 1, name: '吃', sign: '￥', category: 'expenses'},
        ])
        const refIncomeTags = ref([
            {id: 2, name: '工资', sign: '￥', category: 'expenses'}
        ])
        return () => (
            <MainLayout>
                {{
                    title: () => '记一笔',
                    icon: () => <Icon name="doubleLeft"/>,
                    default: () => <>
                        {/* <Tabs selected = {refKind.value} onUpdateSelected={name => refKind.value = name}> */}
                        <Tabs v-model:selected={refKind.value}>
                            <Tab name="支出" class={s.tags_wrapper}>
                                {refExpensesTags.value.map((tag) => {
                                    return <div class={s.tag}>
                                        <div class={s.sign}>
                                            {tag.sign}
                                        </div>
                                        <div class={s.name}>
                                            {tag.name}
                                        </div>
                                    </div>
                                })}
                            </Tab>
                            <Tab name="收入" class={s.tags_wrapper}>
                            {refIncomeTags.value.map((tag) => {
                                    return <div class={s.tag}>
                                    <div class={s.sign}>
                                        {tag.sign}
                                    </div>
                                    <div class={s.name}>
                                        {tag.name}
                                    </div>
                                </div>
                                })}
                            </Tab>
                        </Tabs>
                        <div class={s.inputPad_wrapper}>
                            <InputPad />
                        </div>
                    </>
                }}
            </MainLayout>
        )
    }
})