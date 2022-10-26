import dayjs from "dayjs";
import { defineComponent, ref } from "vue";
import { Icon } from "../../shared/Icon";
import s from './InputPad.module.scss';
import { DatetimePicker, Popup } from 'vant';

export const InputPad = defineComponent({
    // components: {
    //     [DatetimePicker.name]: DatetimePicker,
    // },
    setup: (props,context) => {
        const refShowPop = ref(false)
        const refCurrentDate = ref<Date>(new Date())
        const refAmount = ref('')
        const buttons = [
            {text: '1', onClick: ()=>{}},
            {text: '2', onClick: ()=>{}},
            {text: '3', onClick: ()=>{}},
            {text: '删', onClick: ()=>{}},
            {text: '4', onClick: ()=>{}},
            {text: '5', onClick: ()=>{}},
            {text: '6', onClick: ()=>{}},
            {text: '+', onClick: ()=>{}},
            {text: '7', onClick: ()=>{}},
            {text: '8', onClick: ()=>{}},
            {text: '9', onClick: ()=>{}},
            {text: '-', onClick: ()=>{}},
            {text: '.', onClick: ()=>{}},
            {text: '0', onClick: ()=>{}},
            {text: '清空', onClick: ()=>{refAmount.value = ''}},
            {text: '完成', onClick: ()=>{}},
        ]
        const appendText = (n: number | string) => refAmount.value += n.toString()
        const hideDatePicker = () => refShowPop.value = false
        const showDatePicker = () => refShowPop.value = true
        const setDate = (date: Date) => {refCurrentDate.value = date; hideDatePicker()}
        return () => <>
            <div>
                <div class={s.padNav}>
                    <span class={s.amount}>
                        {refAmount}
                    </span>
                    <span class={s.date}>
                        <Icon name='note' />
                        <span onClick={showDatePicker}>
                            {dayjs(refCurrentDate.value).format('YYYY-MM-DD HH:mm:ss')}
                        </span>
                        <Popup position="bottom" v-model:show={refShowPop.value}>
                            <DatetimePicker
                                value={refCurrentDate.value}
                                type="date"
                                title="选择年月日"
                                onConfirm={setDate}
                                onCancel={hideDatePicker}
                            />
                        </Popup>
                    </span>
                </div>
                <div class={s.buttons}>
                    {buttons.map(item=>
                        <button onClick={item.onClick}>
                            {item.text}
                        </button>
                    )}
                </div>
            </div>
        </>
    }
})