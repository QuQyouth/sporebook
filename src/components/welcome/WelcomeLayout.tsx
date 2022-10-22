import { FunctionalComponent } from "vue";
import s from './WelcomeLayout.module.scss';
export const WelcomeLayout:FunctionalComponent = (props,context) =>{
    const {slots: {icon, title, buttons}} = context
        return (
            <div class={s.wrapper}>
                <div class={s.card}>
                    <div class={s.tips}>
                        {icon?.()}
                    </div>
                    <div class={s.tipsText}>
                        {title?.()}
                    </div>
                </div>
                <div class={s.actions}>
                    {buttons?.()}
                </div>
            </div>
        )
}
WelcomeLayout.displayName = 'WelcomeLayout'