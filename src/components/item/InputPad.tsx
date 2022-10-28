import dayjs from "dayjs";
import { ComputedRef, defineComponent, reactive, ref } from "vue";
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
        const refAmount = ref('0') //当前未输入完的数据
        // const refAmountList = reactive<number[]>([]) //<number[]>添加泛型
        const refNumberList = reactive({pre:'0',cur:'0'})
        const refDisplayAmount = ref('') //这里refDisplayAmount + refAmount是需要展示的数据
        const refSign = ref('')
        const buttons = [
            {text: '1', onClick: ()=>{appendText(1)}},
            {text: '2', onClick: ()=>{appendText(2)}},
            {text: '3', onClick: ()=>{appendText(3)}},
            {text: '删', onClick: ()=>{deleteLast()}},
            {text: '4', onClick: ()=>{appendText(4)}},
            {text: '5', onClick: ()=>{appendText(5)}},
            {text: '6', onClick: ()=>{appendText(6)}},
            {text: '+', onClick: ()=>{addOrSubtract("+")}},
            {text: '7', onClick: ()=>{appendText(7)}},
            {text: '8', onClick: ()=>{appendText(8)}},
            {text: '9', onClick: ()=>{appendText(9)}},
            {text: '-', onClick: ()=>{addOrSubtract('-')}},
            {text: '.', onClick: ()=>{appendText('.')}},
            {text: '0', onClick: ()=>{appendText(0)}},
            {text: '清空', onClick: ()=>{operationEmpty()}},
            {text: '=', onClick: ()=>{performOperation('=')}},
        ]
        const operationEmpty = () => {
            refAmount.value = '0'
            refNumberList.pre = '0'
            refNumberList.cur = '0'
            refDisplayAmount.value = ''
        }
        const performOperation = (e: "=") => {
            const result = eval(refAmount.value)
            refAmount.value = result.toFixed(2)
        }
        const deleteLast = () => {
            refAmount.value = refAmount.value.substring(0, refAmount.value.length - 1)
        }

        const addOrSubtract = (e: '+'|'-') => {
            // 这里注意toFixed返回的是string; Number可以去掉小数点后多余的0
            refNumberList.cur = parseFloat(refAmount.value).toFixed(2)
            const preNumber = parseFloat(refNumberList.pre)
            const curNumber = parseFloat(refNumberList.cur)
            if(e === '+'){
                refNumberList.pre = Number((curNumber + preNumber).toFixed(2)).toString()
            }else{
                debugger
                refNumberList.pre = Number((curNumber - preNumber).toFixed(2)).toString()
            }
            debugger
            refDisplayAmount.value = refNumberList.pre + e
            refAmount.value = ''
            refNumberList.cur = '0'
        }

        //每个数字的逻辑
        const appendText = (n: number | string) => {
            const nString = n.toString()
            const dotIndex = refAmount.value.indexOf('.')
            if (refAmount.value.length >= 13) {
                return
            }

            // if (dotIndex >= 0 && refAmount.value.length - dotIndex > 2) return

            if (nString === '.') {
                
                // const currentList = [...refAmount.value]
                // const signList = currentList.filter(item => item === "+" || item === "-" )
                
                // const numberList = refAmount.value.split(/[+]|-/)
                
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
                        {refDisplayAmount.value + refAmount.value}
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