import { defineComponent, PropType, ref } from "vue";
import { RouterLink } from "vue-router";
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
                        <section class={s.currentUser}>
                            <RouterLink to={`/sign_in`}>
                                <h2>未登录用户</h2>
                                <p>点击这里登录</p>
                            </RouterLink>
                        </section>
                        <nav class={s.action}>
                            <ul class={s.action_list}>
                                <li class={s.action_Item}>
                                    <RouterLink to="/statistics">
                                        <Icon name="chart" class={s.icon}/>
                                        统计图表
                                    </RouterLink>
                                    
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </>
        )
    }
})

export const OverlayIcon = defineComponent({
    setup: (props,context) => {
        const refOverlayVisible = ref(false)
        const onClickMenu = () => {
            
            refOverlayVisible.value = !refOverlayVisible.value
            console.log(refOverlayVisible.value);
        }
        return () => (
            <>
                <Icon name="menu" onClick={onClickMenu} class={s.icon} />
                {refOverlayVisible.value && 
                    <Overlay onClose={() => refOverlayVisible.value = false}/>
                }
            </>
        )
    }
})