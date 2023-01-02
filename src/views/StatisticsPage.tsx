import { defineComponent } from "vue";
import { Charts } from "../components/statistics/Charts";
import { StatisticsLayout } from "../layouts/StatisticsLayout";
export const StatisticsPage = defineComponent({
    setup: (props,context) => {
        return () => (
            <StatisticsLayout component={Charts} />
        )
    }
})