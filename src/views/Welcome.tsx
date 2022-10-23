import { defineComponent, ref, Transition, VNode, watchEffect } from "vue";
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from "vue-router";
import s from "./Welcome.module.scss";
import logo from "../assets/icons/spore.png";
import { useSwipe } from "../hooks/useSwipe";
import { throttle } from "../shared/throttle";

export const Welcome = defineComponent({
    setup: (props,context) => {
        const main = ref<HTMLElement>()
        const {direction,swiping} = useSwipe(main,{beforeStart: e=>e.preventDefault()})
        const route = useRoute()
        const router = useRouter()

        // 节流防抖
        const pushRouter = throttle(()=>{
            if (route.name === 'Welcome1') {
                router.push('/welcome/2')
            }else if (route.name === 'Welcome2') {
                router.push('/welcome/3')
            }else if (route.name === 'Welcome3') {
                router.push('/welcome/4')
            }else if (route.name === 'Welcome4') {
                router.push('/start')
            }
        },500)
        watchEffect(()=>{
            if (swiping.value && direction.value === 'left') {
                pushRouter()
            }
        })
        return () => (
            <div class={s.wrapper}>
                <header>
                    <img src={logo} class={s.logo}/>
                    <h1>孢子记账</h1>
                </header>
                <main ref={main}>
                    <RouterView name="main">
                        {({ Component: X, route: R }: { Component: VNode, route: RouteLocationNormalizedLoaded }) =>
                            <Transition 
                                enterFromClass={s.slide_fade_enter_from} 
                                enterActiveClass={s.slide_fade_enter_active}
                                leaveToClass={s.slide_fade_leave_to} 
                                leaveActiveClass={s.slide_fade_leave_active}>
                                {X}
                            </Transition>
                        }
                    </RouterView>
                </main>
                <footer>
                    <RouterView name="footer"/>
                </footer>
            </div>
        )
    }
})