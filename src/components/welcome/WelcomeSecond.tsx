import { RouterLink } from "vue-router";
import s from './WelcomeLayout.module.scss';
import { WelcomeLayout } from "./WelcomeLayout";
export const WelcomeSecond = () => {
    return (
        <WelcomeLayout>
            {{
                icon:()=><>icon2</>,
                title:()=><>welcome2</>,
                buttons:()=><>
                    <RouterLink class={s.fake} to="/start">跳过</RouterLink>
                    <RouterLink to="/welcome/3">下一页</RouterLink>
                    <RouterLink to="/start">跳过</RouterLink>
                </>
            }}
        </WelcomeLayout>
    )
}
WelcomeSecond.displayName = 'WelcomeSecond'