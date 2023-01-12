import { defineComponent, reactive } from "vue";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { Form, FormItem } from "../shared/Form";
import { Icon } from "../shared/Icon";
import { validate } from "../shared/validate";
import logo from "../assets/icons/spore.png"
import s from './SignInPage.module.scss';
import axios from "axios";
export const SignInPage = defineComponent({
    setup: (props,context) => {
        const formDate = reactive({
            email: '',
            code: ''
        })
        const errors = reactive({
            email: [],
            code: []
        })
        const onSubmit = (e: Event) => {
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
            
        }
        const onClickSendValidationCode =  async () => {
            console.log(111);
            
            const response = await axios.post('/api/v1/validation_codes', {email: formDate.email})
            console.log(response);
            
        }
        return () => (
            <MainLayout>
                {{
                    title: () => '登录',
                    icon: () => <Icon name="doubleLeft" />,
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
                                    <Button>登录</Button>
                                </FormItem>
                            </Form>
                        </div>
                    )
                }}
            </MainLayout>
        )
    }
})