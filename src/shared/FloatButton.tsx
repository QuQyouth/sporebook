import { defineComponent, PropType } from "vue";
import { IconName, Icon } from "./Icon";
import s from './FloatButton.module.scss';
export const FloatButton = defineComponent({
    props: {
        iconName: {
            type: String as PropType<IconName>,
            require: true,
        }
    },
    setup: (props,context) => {
        return () => (
            <div class={s.floatButton}>
                <Icon name={props.iconName} class={s.icon}/>
            </div>
        )
    }
})