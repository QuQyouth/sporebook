import axios from "axios";
import { Dialog } from "vant";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { BackIcon } from "../../shared/BackIcon";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from './ItemCreate.module.scss';

export const ItemCreate = defineComponent({
    setup: (props,context) => {
        /**
        * ApifoxModel
        */
        interface ApifoxModel {
            amount: number;
            ItemId: string;
            kind: string;
            tag: Tag;
            time: string;
        }
        
        interface Tag {
            name: string;
            sign: string;
            tagId: string;
            kind: string;
        }
        const userIfo = reactive({})
        const refKind = ref('支出')
        // 假定删选后的支出或收入tags数据
        const refExpensesTags = reactive([
            {tagId: '1', kind: 'expenditure' ,name: '吃', sign: '￥'},
            {tagId: '2', kind: 'expenditure' ,name: '吃', sign: '￥'},
            {tagId: '3', kind: 'expenditure' ,name: '吃', sign: '￥'},
            {tagId: '4', kind: 'expenditure' ,name: '吃', sign: '￥'},
        ])
        const refIncomeTags = reactive([
            {tagId: '5', kind: 'income', name: '工资', sign: '￥'},
            {tagId: '6', kind: 'income', name: '工资', sign: '￥'},
            {tagId: '7', kind: 'income', name: '工资', sign: '￥'},
        ])

        const router = useRouter()
        const route = useRoute()
        
        const formDateSubmit:ApifoxModel = reactive({            
            ItemId: '',
            kind: '支出',
            tag: {
                tagId: "",
                sign: "",
                name: "",
                kind: ""
            },
            amount: 0,
            time: ""
        })
        const onError = () => {
            Dialog.alert({ title: '提示', message: '创建失败' })
          }
        const onSubmit = async () => {
            const response = await axios.post('https://mock.apifox.cn/m1/2233710-0-default/user/item', formDateSubmit).catch(onError)
            Object.assign(userIfo, response)
            router.push('/items')
            
        }

        const onSelect = (tag:Tag) => {
            formDateSubmit.tag.tagId = tag.tagId
            
        }
          
        const timer = ref<number>()
        const currentTag = ref<HTMLDivElement>()

        const onLongPress = (tagId: Tag['tagId'])=>{
            router.push(`/tags/${tagId}/edit?kind=${formDateSubmit.kind}`)
            console.log(tagId);
            
        }
        const onTouchStart = (e: TouchEvent, tag: Tag ) => {
            currentTag.value = e.currentTarget as HTMLDivElement
            timer.value = setTimeout(()=>{
              onLongPress(tag.tagId)
            }, 500)
        }
        const onTouchEnd = (e: TouchEvent) => {
            clearTimeout(timer.value)
        }
        const onTouchMove = (e: TouchEvent) => {
            const pointedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
            if(currentTag.value !== pointedElement &&
              currentTag.value?.contains(pointedElement) === false){
              clearTimeout(timer.value)
            }
          }
        onMounted(async ()=>{
            const response = await axios.post('https://mock.apifox.cn/m1/2233710-0-default/user/1', "1")
            
            if (route.query.sign) {
                let currentTag = {
                    tagId: route.query.tagId!.toString(),
                    kind: route.query.kind!.toString(), 
                    sign: route.query.sign!.toString(), 
                    name: route.query.name!.toString(),
                }
                route.query.kind === 'expenditure' ? refExpensesTags.unshift(currentTag) : refIncomeTags.unshift(currentTag)
                
            }
        })
        return () => (
            <MainLayout>
                {{
                    title: () => '记一笔',
                    icon: () => <BackIcon/>,
                    default: () => <>
                        <Tabs 
                            v-model:selected={formDateSubmit.kind}
                            //相当于
                            // selected={refKind.value}
                            // onUpdate:selected={name=>refKind.value = name}
                        >
                            {/* <Tab name="支出" class={s.tags_wrapper}> */}
                            <Tab name="支出" class={s.tags_wrapper} 
                            kind="expenditure">
                                {refExpensesTags.map((tag) => {
                                    return <div class={[s.tag, formDateSubmit.tag.tagId === tag.tagId ? s.selected : '']}
                                                onClick={()=> onSelect(tag)}
                                                onTouchmove={onTouchMove} 
                                                onTouchstart={(e)=>onTouchStart(e, tag)}
                                                onTouchend={onTouchEnd}
                                            >
                                        <div class={s.sign}>
                                            {tag.sign}
                                        </div>
                                        <div class={s.name}>
                                            {tag.name}
                                        </div>
                                    </div>
                                })}
                                <RouterLink to={`/tags/create?kind=${'expenditure'}`} class={s.tag}>
                                    <div class={s.sign}>
                                        <Icon name="add" class={s.createTag} />
                                    </div>
                                    <div class={s.name}>新增</div>
                                </RouterLink>

                            </Tab>
                            <Tab name="收入" class={s.tags_wrapper} kind="income">
                            {refIncomeTags.map((tag) => {
                                    return <div class={[s.tag, formDateSubmit.tag.tagId === tag.tagId ? s.selected : '']}
                                                onTouchmove={onTouchMove}
                                                onClick={()=> onSelect(tag)}
                                                onTouchstart={(e)=>onTouchStart(e, tag)}
                                                onTouchend={onTouchEnd}
                                            >
                                                <div class={s.sign}>
                                                    {tag.sign}
                                                </div>
                                                <div class={s.name}>
                                                    {tag.name}
                                                </div>
                                            </div>
                                })}
                                <RouterLink to={`/tags/create?kind=${'income'}`} class={s.tag}>
                                    <div class={s.sign}>
                                    <Icon name="add" class={s.createTag} />
                                    </div>
                                    <div class={s.name}>新增</div>
                                </RouterLink>
                            </Tab>
                        </Tabs>
                        <div class={s.inputPad_wrapper}>
                            <InputPad 
                                v-model:time={formDateSubmit.time}
                                v-model:amount={formDateSubmit.amount}
                                onSubmit={onSubmit}
                            />
                        </div>
                    </>
                }}
            </MainLayout>
        )
    }
})