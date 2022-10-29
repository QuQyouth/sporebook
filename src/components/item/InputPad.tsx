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
        const refNumberList = reactive({pre:'',cur:'0'})
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
            refNumberList.pre = ''
            refNumberList.cur = '0'
        }
        const performOperation = (e: "=") => {
            refNumberList.pre += refNumberList.cur
            refNumberList.cur = ''
            let resultLast = refNumberList.pre.charAt(refNumberList.pre.length - 1)
            // 去除最后一个无用符号
            if (!Number(resultLast)) {
                refNumberList.pre = refNumberList.pre.substring(0, refNumberList.pre.length - 1)
            }
            try{
                // 这里注意toFixed返回的是string; Number()可以去掉小数点后多余的0
                refNumberList.pre = Number(eval(refNumberList.pre).toFixed(2)).toString()
            }catch(e){
                console.warn(e)
            }
        }
        const deleteLast = () => {
            if (refNumberList.cur) {
                refNumberList.cur = refNumberList.cur.substring(0, refNumberList.cur.length - 1)
            }else{
                refNumberList.pre = refNumberList.pre.substring(0, refNumberList.pre.length - 1)
            }
            
        }

        const addOrSubtract = (e: '+'|'-') => {

            refNumberList.pre += refNumberList.cur
            
            let resultLast = refNumberList.pre.charAt(refNumberList.pre.length - 1)
            // 去除最后一个无用符号
            if (!Number(resultLast)) {
                refNumberList.pre = refNumberList.pre.substring(0, refNumberList.pre.length - 1)
            }
            
            if(!Number(refNumberList.pre)){
                
                try{
                    // 这里注意toFixed返回的是string; Number()可以去掉小数点后多余的0
                    refNumberList.pre = Number(eval(refNumberList.pre).toFixed(2)).toString()
                }catch(e){
                    console.warn(e)
                }
            }
            refNumberList.cur = ''
            
            appendText(e)
        }

        const appendText = (n: number | string) => {
            const nString = n.toString()
            const dotIndex = refNumberList.cur.indexOf('.')
            if (refNumberList.cur.length >= 13) {
                return
            }

            if (dotIndex >= 0 && refNumberList.cur.length - dotIndex > 2) return

            if (nString === '.') {                
                if (dotIndex >= 0) { // 已经有小数点了
                    return
                }
            } else if (nString === '0') {
                if (dotIndex === -1) { // 没有小数点
                if (refNumberList.cur === '0') { // 没小数点，但是有0
                    return
                }
                }
            } else {
                if (refNumberList.cur === '0') {
                    refNumberList.cur = ''
                }
            }
            refNumberList.cur += n.toString()
            
        }
        const hideDatePicker = () => refShowPop.value = false
        const showDatePicker = () => refShowPop.value = true
        const setDate = (date: Date) => {refCurrentDate.value = date; hideDatePicker()}
        return () => <>
            <div>
                <div class={s.padNav}>
                    <span class={s.amount}>
                        {refNumberList.pre + refNumberList.cur}
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