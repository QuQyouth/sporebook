import dayjs from "dayjs";
import { ComputedRef, defineComponent, reactive, ref } from "vue";
import { Icon } from "../../shared/Icon";
import s from './InputPad.module.scss';
import { DatetimePicker, Popup } from 'vant';
import { number } from "echarts";

export const InputPad = defineComponent({
    // components: {
    //     [DatetimePicker.name]: DatetimePicker,
    // },
    setup: (props,context) => {
        const refShowPop = ref(false)
        const refCurrentDate = ref<Date>(new Date())
        const refAmount = ref('')
        // const refAmountList = reactive<number[]>([]) //<number[]>添加泛型
        const buttons = [
            {text: '1', onClick: ()=>{appendText(1)}},
            {text: '2', onClick: ()=>{appendText(2)}},
            {text: '3', onClick: ()=>{appendText(3)}},
            {text: '删', onClick: ()=>{deleteLast()}},
            {text: '4', onClick: ()=>{appendText(4)}},
            {text: '5', onClick: ()=>{appendText(5)}},
            {text: '6', onClick: ()=>{appendText(6)}},
            {text: '+', onClick: ()=>{appendText('+')}},
            {text: '7', onClick: ()=>{appendText(7)}},
            {text: '8', onClick: ()=>{appendText(8)}},
            {text: '9', onClick: ()=>{appendText(9)}},
            {text: '-', onClick: ()=>{appendText('-')}},
            {text: '.', onClick: ()=>{appendText('.')}},
            {text: '0', onClick: ()=>{appendText(0)}},
            {text: '清空', onClick: ()=>{refAmount.value = '0'}},
            {text: '=', onClick: ()=>{performOperation('=')}},
        ]
        const performOperation = (e: "=") => {
            const result = eval(refAmount.value)
            refAmount.value = result.toFixed(2)
        }
        const deleteLast = () => {
            refAmount.value = refAmount.value.substring(0, refAmount.value.length - 1)
        }
        const appendText = (n: number | string) => {
            const nString = n.toString()
            const dotIndex = refAmount.value.indexOf('.')
            if (refAmount.value.length >= 13) {
                return
            }

            if (dotIndex >= 0 && refAmount.value.length - dotIndex > 2) return

            if (nString === '.') {
                const currentList = [...refAmount.value]
                const signList = currentList.filter(item => item === "+" || item === "-" )
                
                const numberList = refAmount.value.split(/[+]|-/)

                // for (const item in numberList) {
                //     // 数字列表中的每一项已经存在小数点
                    
                //     if (item.indexOf('.') >= 0) {
                //         return
                //     }
                // }
                
                if (dotIndex >= 0) { // 已经有小数点了
                return
                }
            } else if (nString === '0') {
                if (dotIndex === -1) { // 没有小数点
                if (refAmount.value === '0') { // 没小数点，但是有0
                    return
                }
                }
            } else {
                if (refAmount.value === '0') {
                refAmount.value = ''
                }
            }
            refAmount.value += n.toString()
        }
        const hideDatePicker = () => refShowPop.value = false
        const showDatePicker = () => refShowPop.value = true
        const setDate = (date: Date) => {refCurrentDate.value = date; hideDatePicker()}
        return () => <>
            <div>
                <div class={s.padNav}>
                    <span class={s.amount}>
                        {refAmount.value}
                    </span>
                    <span class={s.date}>
                        <Icon name='note' />
                        <span onClick={showDatePicker}>
                            {dayjs(refCurrentDate.value).format('YYYY-MM-DD HH:mm')}
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