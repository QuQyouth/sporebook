import { defineComponent } from "vue";
import { Icon } from "../../shared/Icon";
import s from './InputPad.module.scss';
export const InputPad = defineComponent({
    setup: (props,context) => {
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
            {text: '清空', onClick: ()=>{}},
            {text: '完成', onClick: ()=>{}},
        ]
        return () => <>
            <div>
                <div class={s.padNav}>
                    <div class={s.amount}>
                        88888
                    </div>
                    <div class={s.date}>
                        <Icon name='note' />
                        <span>2022-10-26</span>
                    </div>
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