import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import s from './WelcomeFirst.module.scss';
export const WelcomeSecond = defineComponent({
    setup: (props,context) => {
        return () => (
            <div class={s.wrapper}>
                <div class={s.card}>
                    <div class={s.tips}></div>
                    <div class={s.tipsText}>welcome2</div>
                </div>
                <div class={s.actions}>
                    <RouterLink class={s.fake} to="/start">跳过</RouterLink>
                    <RouterLink to="/welcome/3">下一页</RouterLink>
                    <RouterLink to="/start">跳过</RouterLink>
                </div>
            </div>
        )
    }
})