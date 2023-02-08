import { defineComponent, reactive, toRaw } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button } from "../../shared/Button";
import { EmojiSelect } from "../../shared/EmojiSelect";
import { Form, FormItem } from "../../shared/Form";
import { defaultHttpClient } from "../../shared/HttpClient";
import { Rules, validate } from "../../shared/validate";
import s from './TagForm.module.scss'; 
export const TagForm = defineComponent({
  props: {
    tagId: String
  },
  setup: (props,context) => {
    const router = useRouter()
    const route = useRoute()
    const formData = reactive({
      tagId: "",
      kind: route.query.kind!.toString(),
      name: "",
      sign: "",
    })
    const errors = reactive<{[k in keyof typeof formData]?: string[]}>({})
    const onSubmit = async (e: Event)=>{
      e.preventDefault()
      console.log(toRaw(formData)); //拿到原始值
      const rules : Rules<typeof formData> = [
        {key: 'name', type: 'required', message: '必填'},
        {key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '输入1~4个字符'},
        {key: 'sign', type: 'required', message: '必填'}
      ]
      Object.assign(errors, {
        name: undefined,
        sign: undefined
      })
      Object.assign(errors, validate(formData, rules))
      console.log(formData);
      await defaultHttpClient.post('/tagCreate',formData)
      router.push({path: '/items/create'})
      
    }
    return () => (
      <Form onSubmit={onSubmit}>
          <FormItem label='标签名'
            type="text"
            v-model={formData.name}
            error={errors['name'] ? errors['name'][0] : '　'} />
          <FormItem label={'符号 ' + formData.sign}
            type="emojiSelect" 
            v-model={formData.sign}
            error={errors['sign'] ? errors['sign'][0] : '　'} />
          <FormItem>
            <p class={s.tips}>记账时长按标签即可进行编辑</p>
          </FormItem>
          <FormItem>
            <Button type="submit" class={[s.button]}>确定</Button>
          </FormItem>
      </Form>
    )
  }
})