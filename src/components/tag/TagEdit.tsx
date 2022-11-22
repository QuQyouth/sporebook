import { defineComponent} from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import s from './TagEdit.module.scss';
import { Icon } from '../../shared/Icon';
import { TagForm } from './TagForm';
import { Button } from "../../shared/Button";
export const TagEdit = defineComponent({
    setup: (props, context) => {
        return () => (
          <MainLayout>{{
            title: () => '新建标签',
            icon: () => <Icon name="doubleLeft" onClick={() => { }} />,
            default: () => (
              <>
                <TagForm />
                <div class={s.actions}>
                  <Button class={s.btnLeft} level='danger'>删除标签</Button>
                  <Button level='danger'>删除标签和记账</Button>
                </div>
              </>)
          }}</MainLayout>
        )
      }
})