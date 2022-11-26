import { defineComponent, PropType } from "vue";
import s from './ItemSummary.module.scss';
export const ItemSummary = defineComponent({
    props: {
        startDate: {
            type: String as PropType<string>,
            required: true
        },
        endDate: {
            type: String as PropType<string>,
            required: true
        }
    },
    setup: (props,context) => {
        return () => (
            <div class={s.wrapper}>
                {props.startDate}
                {props.endDate}
                <ul class={s.total}>
                    <li><span>收入</span><span>100</span></li>
                    <li><span>支出</span><span>100</span></li>
                    <li><span>净收入</span><span>100</span></li>
                </ul>
                <ol class={s.list}>
                    <li>
                        <div class={s.sign}>sign</div>
                        <div class={s.tag}>吃</div>
                        <div class={s.amount}>10</div>
                    </li>
                    <li>
                        <div class={s.sign}>sign</div>
                        <div class={s.tag}>吃</div>
                        <div class={s.amount}>10</div>
                    </li>
                </ol>
            </div>
        )
    }
})