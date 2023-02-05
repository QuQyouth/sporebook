import { defineComponent} from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import s from './TagEdit.module.scss';
import { TagForm } from './TagForm';
import { Button } from "../../shared/Button";
import { useRoute, useRouter } from "vue-router";
import { Dialog } from "vant";
import { BackIcon } from "../../shared/BackIcon";
export const TagEdit = defineComponent({
    setup: (props, context) => {
      const route = useRoute()
      const router = useRouter()
      const tagId = route.params.id!.toString()

      const onError = () => {
        Dialog.alert({ title: '提示', message: '删除失败' })
      }

      const onDelete = () => {
        Dialog.confirm({
          title: '确认',
          message: '你真的要删除吗？',
        })
        .then(()=>{
          router.back()
        })
        .catch(()=>{
          onError()
        })
      }
      return () => (
        <MainLayout>{{
          title: () => '编辑标签',
          icon: () => <BackIcon />,
          default: () => (
            <>
              <TagForm tagId={tagId}/>
              <div class={s.actions}>
                <Button class={s.btnLeft} level='danger' onClick={onDelete}>删除标签</Button>
                <Button level='danger' onClick={onDelete}>删除标签和记账</Button>
              </div>
            </>)
        }}</MainLayout>
      )
    }
})