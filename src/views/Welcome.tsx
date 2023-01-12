import { defineComponent, ref, Transition, VNode, watchEffect } from "vue";
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from "vue-router";
import s from "./Welcome.module.scss";
import logo from "../assets/icons/spore.png";
import { useSwipe } from "../hooks/useSwipe";
import { throttle } from "../shared/throttle";
import { Icon } from "../shared/Icon";

// Record 将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型
const pushRouterMap: Record<string,string> = {
    'Welcome1': '/welcome/2',
    'Welcome2': '/welcome/3',
    'Welcome3': '/welcome/4',
    'Welcome4': '/start',
}

export const Welcome = defineComponent({
    setup: (props,context) => {
        const main = ref<HTMLElement>()
        const {direction,swiping} = useSwipe(main,{beforeStart: e=>e.preventDefault()})
        const route = useRoute()
        const router = useRouter()

        // 节流防抖
        const pushRouter = throttle(()=>{
            const name = (route.name || 'Welcome1').toString()
            router.push(pushRouterMap[name])
        },500)
        watchEffect(()=>{
            if (swiping.value && direction.value === 'left') {
                pushRouter()
            }
        })
        return () => (
            <div class={s.wrapper}>
                <header>
                    {/* <img src={logo} class={s.logo}/> */}
                    <Icon name="logo" class={s.logo} />
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