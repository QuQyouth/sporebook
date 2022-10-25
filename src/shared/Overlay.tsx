import { defineComponent, PropType } from "vue";
import { Icon } from "../shared/Icon";
import s from './Overlay.module.scss';

export const Overlay = defineComponent({
    props: {
        onClose: {
            type: Function as PropType<() => void>
        }
    },
    setup: (props,context) => {
        const closeOverlay = () => {
            props.onClose?.()
        }
        return () => (
            <>
                <div class={s.mask} onClick={closeOverlay}>
                    <div class={s.overlay}>
                        <section>
                            <h2>未登录用户</h2>
                            <p>点击这里登录</p>
                        </section>
                        <nav>
                            <ul class={s.action_list}>
                                <li>
                                    <Icon name="chart"/>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </>
        )
    }
})