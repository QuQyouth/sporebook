import { defineComponent, PropType } from "vue";
import s from './Icon.module.scss';

export type IconName = 'add' | 'tipsMoney' | 'menu' | 'chart' | 'doubleLeft' | 'note'

export const Icon = defineComponent({
    props:{
        name:{
            type: String as PropType<IconName>,
            require: true,
        },
        onClick: {
            type: Function as PropType<(e: MouseEvent) => void>
        }
    },
    setup: (props,context) => {
        return () => (
            <svg class={s.icon} onClick={props.onClick}>
                <use xlinkHref={'#' + props.name}></use>
            </svg>
        )
    }
})