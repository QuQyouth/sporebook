import { RouterLink } from "vue-router";
import s from './WelcomeLayout.module.scss';
import { WelcomeLayout } from "./WelcomeLayout";
export const WelcomeThird = () => {
    return (
        <WelcomeLayout>
            {{
                icon:()=><>icon3</>,
                title:()=><>welcome3</>,
                buttons:()=><>
                    <RouterLink class={s.fake} to="/start">跳过</RouterLink>
                <RouterLink to="/welcome/4">下一页</RouterLink>
                <RouterLink to="/start">跳过</RouterLink>
                </>
            }}
        </WelcomeLayout>
    )
}
WelcomeThird.displayName = 'WelcomeThird'