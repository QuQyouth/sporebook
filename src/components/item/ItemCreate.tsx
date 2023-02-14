/// <reference types="vite/client" />
import axios from "axios";
import { Dialog } from "vant";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { BackIcon } from "../../shared/BackIcon";
import { DivideGroup } from "../../shared/DivideGroup";
import { defaultHttpClient } from "../../shared/HttpClient";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { hasError, validate } from "../../shared/validate";
import { ItemData } from "../statistics/ItemDate";
import { InputPad } from "./InputPad";
import s from './ItemCreate.module.scss';

export const ItemCreate = defineComponent({
    setup: (props,context) => {
        
        const refKind = ref('支出')
        const router = useRouter()
        const formDateSubmit = reactive<ItemFormDate>({
            id: '',
            name: '',
            kind: 'expenditure',
            amount: '',
            time: ''
        })
        const onError = () => {
            Dialog.alert({ title: '提示', message: '创建失败' })
        }
        
        const errors = reactive<FormErrors<typeof formDateSubmit>>({ kind: [], id: [], amount: [], time: [] })
        const onSubmit = async () => {
            Object.assign(errors, { kind: '', id: '', amount: '', time: '' })
            Object.assign(errors, validate(formDateSubmit, [
                { key: 'kind', type: 'required', message: '类型必填' },
                { key: 'id', type: 'required', message: '标签必填' },
                { key: 'amount', type: 'required', message: '金额必填' },
            ]))
            if(hasError(errors)){
                Dialog.alert({
                  message: Object.values(errors).filter(i=>i.length>0).join('\n')
                })
                return
            }
            await defaultHttpClient.post('/ItemCreate', formDateSubmit).catch(onError)
            router.push('/items')
            
        }

        const onSelect = (tag:Tag) => {
            formDateSubmit.id = tag.id
        }
        
        const timer = ref<number>()
        const currentTag = ref<HTMLDivElement>()

        const onLongPress = (id: Tag['id'])=>{
            router.push(`/tags/${id}/edit?kind=${formDateSubmit.kind}`)
        }
        const onTouchStart = (e: TouchEvent, tag: Tag ) => {
            currentTag.value = e.currentTarget as HTMLDivElement
            // 在Node.js中setTimeout()返回的是一个Timer对象而不是一个数字类型的id
            timer.value = window.setTimeout(()=>{
              onLongPress(tag.id)
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
        
        const tagsList = ref<Tag[]>([])
        const expenditureTags = computed(() => tagsList.value.filter((tag)=>tag.kind === 'expenditure'))
        const incomeTags = computed(() => tagsList.value.filter((tag)=>tag.kind === 'income'))
        
        onMounted(async () => {
            const result:any = await defaultHttpClient.get("/getTagsList")
            tagsList.value = result.data.tagsList
        });
        return () => (
            <MainLayout>
                {{
                    title: () => '记一笔',
                    icon: () => <BackIcon/>,
                    default: () => <>
                        <Tabs 
                            v-model:selected = {refKind.value}
                        >
                            <Tab name="支出" class={s.tags_wrapper} 
                            value="expenditure">
                                {expenditureTags.value.map((tag) => {
                                    return <div class={[s.tag, formDateSubmit.id === tag.id ? s.selected : '']}
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
                            <Tab name="收入" class={s.tags_wrapper} value="income">
                                
                            {incomeTags.value.map((tag) => {
                                    return <div class={[s.tag, formDateSubmit.id === tag.id ? s.selected : '']}
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
