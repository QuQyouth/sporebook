import { defineComponent, reactive } from "vue";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { Form, FormItem } from "../shared/Form";
import { Icon } from "../shared/Icon";
import { validate } from "../shared/validate";
import s from './SignInPage.module.scss';
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
        return () => (
            <MainLayout>
                {{
                    title: () => '登录',
                    icon: () => <Icon name="doubleLeft" />,
                    default: () => (
                        <div class={s.wrapper}>
                            <Form onSubmit={onSubmit}>
                                <FormItem label="邮箱地址" type="text" v-model={formDate.email} error={errors.email?.[0] ?? '　'}/>
                                <FormItem label="验证码" type="verificationCode" v-model={formDate.code} error={errors.code?.[0] ?? '　'}/>
                                <FormItem >
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