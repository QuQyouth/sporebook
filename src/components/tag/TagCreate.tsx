import { defineComponent } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import s from './TagCreate.module.scss';
export const TagCreate = defineComponent({
    setup: (props,context) => {
        return () => (
            <MainLayout>
                {{
                    title: () => '新建标签',
                    icon: () => <Icon name="doubleLeft" onClick={()=>{}}/>,
                    default: () => (
                        <form action="">
                            <div>
                                <label>
                                    <span>name</span>
                                    <input type="text" />
                                </label>
                            </div>
                            
                            <div>
                                <label>
                                    <span>sign</span>
                                    <div>
                                        <nav>
                                            <span>表情</span>
                                            <span>表情</span>
                                            <span>表情</span>
                                            <span>表情</span>
                                            <span>表情</span>
                                            <span>表情</span>
                                        </nav>
                                        <ol>
                                            <li>1</li>
                                            <li>1</li>
                                            <li>1</li>
                                        </ol>
                                    </div>
                                </label>
                            </div>
                            <div>
                                <p>长按编辑</p>
                            </div>
                            <div>
                                <button>确定</button>
                            </div>
                            
                        </form>
                    )
                }}
            </MainLayout>
        )
    }
})