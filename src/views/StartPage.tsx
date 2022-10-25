import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import { Overlay } from "../shared/Overlay";
import s from './StartPage.module.scss';

export const StartPage = defineComponent({
    setup: (props,context) => {
        const refOverlayVisible = ref(false)
        const onClickMenu = () => {
            
            refOverlayVisible.value = !refOverlayVisible.value
            console.log(refOverlayVisible.value);
        }
        return () => (
            <MainLayout>
                {{
                    title: () => '孢子记账',
                    icon: () => <Icon name="menu" onClick={onClickMenu} />,
                    default: () => <>
                        <Center class={s.money_wrapper}>
                            <Icon name="tipsMoney" class={s.tipsMoney} />
                        </Center>
                        <div class={s.button_wrapper}>
                            <RouterLink to='/items/create'>
                                <Button>开始记账</Button>
                            </RouterLink>
                        </div>
                        <RouterLink to='/items/create'>
                            <FloatButton iconName="add"></FloatButton>
                        </RouterLink>
                        {refOverlayVisible.value && 
                            <Overlay onClose={() => refOverlayVisible.value = false}/>
                        }
                    </>
                }}
            </MainLayout>
        )
    }
})