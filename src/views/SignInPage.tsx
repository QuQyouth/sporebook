import { defineComponent, reactive } from "vue";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { Form, FormItem } from "../shared/Form";
import { Icon } from "../shared/Icon";
import { hasError, validate } from "../shared/validate";
import s from './SignInPage.module.scss';
import { BackIcon } from "../shared/BackIcon";
import { defaultHttpClient } from "../shared/HttpClient";
import { useRoute, useRouter } from "vue-router";
import { useMeStore } from "../stores/useMeStore";
import { storeToRefs } from "pinia";

export const SignInPage = defineComponent({
    setup: (props,context) => {
        const router = useRouter()
        const currentStore = useMeStore()
        const {token} = storeToRefs(currentStore)
        const formDate = reactive({
            email: '2745914927@qq.com',
            code: '1234'
        })
        const errors = reactive({
            email: [],
            code: []
        })
        const onError = (error: any) => {
            if (error.response.status === 422) {
              Object.assign(errors, error.response.data.errors)
            }
            throw error
          }
        const onSubmit = async (e: Event) => {
            e.preventDefault()
            Object.assign(errors, {
                email: [],
                code: []
            })
            Object.assign(errors, validate(formDate, [
                {key: 'email', type: 'required', message: '必填'},
                {key: 'email', type: 'pattern', regex: /.+@.+/, message: '请输入正确的邮箱格式'},
                {key: 'code', type: 'required', message: '必填'}
            ]))
            if(!hasError(errors)){
                // const response:any = await defaultHttpClient.post('/session', formDate).catch((err)=>{
                //     console.log(err)
                // })
                await currentStore.login(formDate)
                localStorage.setItem('jwt', token.value)
                const returnTo = localStorage.getItem('jwt')
                router.push(returnTo? '/start' : '/')
            }
            
            
        }
        const onClickSendValidationCode =  async () => {
            
            await defaultHttpClient.post('/validation_codes', {email: formDate.email}).catch(onError)
            
            
        }
        return () => (
            <MainLayout>
                {{
                    title: () => '登录',
                    icon: () => <BackIcon />,
                    default: () => (
                        <div class={s.wrapper}>
                            <div class={s.logoWrapper}>
                            {/* <img src={logo} class={s.logo_img}/> */}
                            <Icon name="logo" class={s.logo} />
                            </div>
                            <Form onSubmit={onSubmit}>
                                <FormItem label="邮箱地址" type="text" 
                                    v-model={formDate.email} 
                                    error={errors.email?.[0] ?? '　'}
                                />
                                <FormItem label="验证码" type="verificationCode" 
                                onClick={onClickSendValidationCode}
                                v-model={formDate.code} error={errors.code?.[0] ?? '　'}/>
                                <FormItem class={s.signInButton}>
                                    <Button type="submit">登录</Button>
                                </FormItem>
                            </Form>
                        </div>
                    )
                }}
            </MainLayout>
        )
    }
})