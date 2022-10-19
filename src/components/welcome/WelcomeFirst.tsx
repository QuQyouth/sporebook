import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import s from './WelcomeFirst.module.scss';
export const WelcomeFirst = defineComponent({
    setup: (props,context) => {
        return () => (
            <div class={s.wrapper}>
                <div class={s.card}>
                    <div class={s.tips}></div>
                    <div class={s.tipsText}>hello</div>
                </div>
                <div class={s.actions}>
                    <RouterLink class={s.fake} to="/start">跳过</RouterLink>
                    <RouterLink to="/welcome/2">下一页</RouterLink>
                    <RouterLink to="/start">跳过</RouterLink>
                </div>
            </div>
        )
    }
})