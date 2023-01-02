import { defineComponent } from "vue";
import { StatisticsLayout } from "../../layouts/StatisticsLayout";
import { ItemSummary } from "./ItemSummary";
export const ItemList = defineComponent({
    setup: (props, context) => {
        return () => (
            <StatisticsLayout component={ItemSummary} />
        )
    }
})