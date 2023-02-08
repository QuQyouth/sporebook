import { DatetimePicker, Popup } from 'vant';
import { computed, defineComponent, PropType, ref, VNode } from 'vue';
import { EmojiSelect } from './EmojiSelect';
import s from './Form.module.scss';
import dayjs from 'dayjs';
import { Button } from './Button';
import { GetFriendlyError } from './GetFriendlyError';
export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
    }
  },
  setup: (props, context) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    )
  }
})

export const FormItem = defineComponent({
  props: {
    label: {
      type: String
    },
    modelValue: {
      type: [String, Number, Date]
    },
    type: {
      type: String as PropType<'text' | 'emojiSelect' | 'date' | 'select' | 'verificationCode'>,
    },
    error: {
      type: String
    },
    placeholder: String,
    onClick: Function as PropType<() => void>
  },
  emits:['update:modelValue'], //notice
  setup: (props, context) => {
    const refDateVisible = ref(false)
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return <input
            value={props.modelValue}
            placeholder={props.placeholder}
            onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
            class={[s.formItem, s.input]} />
        case 'emojiSelect':
          return <EmojiSelect
            modelValue={props.modelValue?.toString()}
            onUpdateModelValue={value => context.emit('update:modelValue', value)}
            class={[s.formItem, s.emojiList, s.error]} />
        case 'date':
          return <>
            <input 
              readonly={true} 
              placeholder={props.placeholder}
              value={props.modelValue}
              onClick={() => { refDateVisible.value = true }}
              class={[s.formItem, s.input]} 
            />
            <Popup position='bottom' v-model:show={refDateVisible.value}>
              <DatetimePicker
                modelValue={props.modelValue ? new Date(props.modelValue) : new Date()} 
                type="date" 
                title="选择年月日"
                onConfirm={(date: Date) => {
                  context.emit('update:modelValue', dayjs(date).format('YYYY-MM-DD'))
                  refDateVisible.value = false
                }}
                onCancel={() => refDateVisible.value = false} />
            </Popup></>
        case 'verificationCode':
          return <>
            <input class={[s.formItem, s.input, s.verificationCodeInput]}
              value={props.modelValue}
              onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
            />
            <Button onClick={props.onClick} class={[s.formItem, s.input, s.verificationCodeButton]}>发送验证码</Button>
          </>
        case undefined:
          return context.slots.default?.()
      }
    })
    return () => {
      return <div class={s.formRow}>
        <label class={s.formLabel}>
          {props.label &&
            <span class={s.formItem_name}>{props.label}</span>
          }
          <div class={s.formItem_value}>
            {content.value}
          </div>
          {props.error &&
            <div class={s.formItem_errorHint}>
              <span>{props.error || '　'}</span>
            </div>
          }
        </label>
      </div>
    }
  }
})