import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { MainLayout } from "../layouts/MainLayout";
import { Icon } from "../shared/Icon";
import s from './ItemPage.module.scss';
export const ItemPage = defineComponent({
    setup: (props,context) => {
        return () => (
            <RouterView />
        )
    }
})