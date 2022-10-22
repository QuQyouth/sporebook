import { RouterLink } from "vue-router";
import s from './WelcomeLayout.module.scss';
import { WelcomeLayout } from "./WelcomeLayout";
export const WelcomeForth = () => {
        return (
            <WelcomeLayout>
                {{
                    icon:() => <>icon4</>,
                    title:() => <>welcome4</>,
                    buttons:() => <>
                        <RouterLink class={s.fake} to="/start">跳过</RouterLink>
                    <RouterLink to="/start">完成</RouterLink>
                    <RouterLink class={s.fake} to="/start">跳过</RouterLink>
                    </>
                }}
            </WelcomeLayout>
        )
    }

WelcomeForth.displayName = 'WelcomeForth'