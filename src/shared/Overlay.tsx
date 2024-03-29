import { Dialog } from "vant";
import { defineComponent, onMounted, PropType, reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { Icon } from "../shared/Icon";
import { useMeStore } from "../stores/useMeStore";
import s from './Overlay.module.scss';

export const Overlay = defineComponent({
    props: {
        onClose: {
            type: Function as PropType<() => void>
        }
    },
    setup: (props,context) => {
        const router = useRouter()
        const currentStore = useMeStore()
        const {email} = currentStore
        const closeOverlay = () => {
            props.onClose?.()
        }
        const refCurrentUser = ref<User>()
        const onSignOut = async () => {
            await Dialog.confirm({
              title: '确认',
              message: '你真的要退出登录吗？',
            }).then(async ()=>{
                await currentStore.logout()
                
                localStorage.removeItem('jwt')
                window.location.reload()
            }).catch(async () => {
                router.push('/start')
            }
                
            )

        }
        onMounted(async () => {
            // const response = await currentStore.
        })
        return () => (
            <>
                <div class={s.mask} onClick={closeOverlay}>
                    <div class={s.overlay}>
                        <section class={s.currentUser}>
                            {email ? (
                                <RouterLink to={`/welcome/1`}>
                                    <h2 class={s.email}>{email}</h2>
                                    <p onClick={onSignOut}>点击这里退出登录</p>
                                </RouterLink>
                            ):(
                                <RouterLink to={`/sign_in`}>
                                <h2>未登录用户</h2>
                                <p>点击这里登录</p>
                            </RouterLink>
                            )}
                            
                        </section>
                        <nav class={s.action}>
                            <ul class={s.action_list}>
                                <li class={s.action_Item}>
                                    <RouterLink to="/items/create">
                                        <Icon name="write" class={s.icon}/>
                                        记账
                                    </RouterLink>
                                    
                                </li>
                                <li class={s.action_Item}>
                                    <RouterLink to="/items">
                                        <Icon name="money" class={s.icon}/>
                                        明细
                                    </RouterLink>
                                    
                                </li>
                                <li class={s.action_Item}>
                                    <RouterLink to="/statistics">
                                        <Icon name="chart" class={s.icon}/>
                                        统计
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