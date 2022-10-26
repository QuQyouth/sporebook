import { defineComponent, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import s from './ItemCreate.module.scss';
export const ItemCreate = defineComponent({
    setup: (props,context) => {
        const refKind = ref('支出')
        return () => (
            <MainLayout>
                {{
                    title: () => '记一笔',
                    icon: () => <Icon name="doubleLeft"/>,
                    default: () => <>
                        {/* <Tabs selected = {refKind.value} onUpdateSelected={name => refKind.value = name}> */}
                        <Tabs v-model:selected={refKind.value}>
                            <Tab name="支出">tab1</Tab>
                            <Tab name="收入">tab2</Tab>
                        </Tabs>
                    </>
                }}
            </MainLayout>
        )
    }
})