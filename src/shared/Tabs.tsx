import { defineComponent, PropType } from "vue";
import s from './Tabs.module.scss';
export const Tabs = defineComponent({
    props: {
        selected: {
            type: String as PropType<string>,
            required: false
        },
        // onUpdateSelected: {
        //     type: Function as PropType<(name:string)=>void>
        // }
    },
    emits: ['update:selected'], //notice
    setup: (props,context) => {
        return () => {
            const tabsArray = context.slots.default?.()
            if (!tabsArray) return () => null
            for (let i = 0; i < tabsArray.length; i++) {
                if (tabsArray[i].type !== Tab) {
                    throw new Error('<Tabs> only accepts <Tap> as children')
                }                
            }
            return <div class={s.tabs}>
                <ol class={s.tabs_nav}>
                    {tabsArray.map(item => 
                        <li class={item.props?.name === props.selected ? s.selected : ''}
                            // onClick={()=>props.onUpdateSelected?.(item.props?.name)}
                            onClick = {() => context.emit('update:selected', item.props?.name)}
                        >
                            {item.props?.name}
                        </li>)}
                </ol>
                <div>
                    {tabsArray.find(item => item.props?.name === props.selected)}
                </div>
            </div>
        }
    }
})

export const Tab = defineComponent({
    props:{
        name: {
            type: String as PropType<string>
        },
        value: {
          type: String as PropType<string>,
          required: true
        }
    },
    setup: (props,context) => {
        return () => (
            <div>{context.slots.default?.()}</div>
        )
    }
})