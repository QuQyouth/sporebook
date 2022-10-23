import { defineComponent, Transition, VNode } from "vue";
import { RouteLocationNormalizedLoaded, RouterView } from "vue-router";
import s from "./Welcome.module.scss";
import logo from "../assets/icons/spore.png";

export const Welcome = defineComponent({
    setup: (props,context) => {
        return () => (
            <div class={s.wrapper}>
                <header>
                    <img src={logo} class={s.logo}/>
                    <h1>孢子记账</h1>
                </header>
                <main>
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