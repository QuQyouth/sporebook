import { defineComponent } from "vue";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import { Navbar } from "../shared/Navbar";
import s from './StartPage.module.scss';

export const StartPage = defineComponent({
   setup: (props,context) => {
       return () => (
           <div>
                <nav>
                    <Navbar>
                        {{
                            default: '孢子记账',
                            icon: <Icon name="menu"/>
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
            
           </div>
       )
   }
})