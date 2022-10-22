import { RouterLink } from "vue-router";
import {WelcomeLayout} from "./WelcomeLayout"
import s from './WelcomeLayout.module.scss';

export const WelcomeFirst = () => {
    return <WelcomeLayout>
        {{
            icon: ()=> <>icon</>,
            title:()=><>welcome1</>,
            buttons:()=><>
                <RouterLink class={s.fake} to="/start">跳过</RouterLink>
                <RouterLink to="/welcome/2">下一页</RouterLink>
                <RouterLink to="/start">跳过</RouterLink>
            </>
        }}
    </WelcomeLayout>
}

WelcomeFirst.displayName = 'WelcomeFirst'