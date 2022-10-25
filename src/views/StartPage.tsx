import { defineComponent, ref } from "vue";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import { Navbar } from "../shared/Navbar";
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
            <div>
                <nav>
                    <Navbar>
                        {{
                            default: () => '孢子记账',
                            icon: () => <Icon name="menu" onClick={onClickMenu} />,
                        }}
                    </Navbar>
                </nav>
                <Center class={s.money_wrapper}>
                    <Icon name="tipsMoney" class={s.tipsMoney} />
                </Center>
                <div class={s.button_wrapper}>
                    <Button>开始记账</Button>
                </div>
                <FloatButton iconName="add"></FloatButton>
                {refOverlayVisible.value && 
                    <Overlay onClose={() => refOverlayVisible.value = false}/>
                }
                
            </div>
        )
    }
})