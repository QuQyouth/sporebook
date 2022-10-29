import { defineComponent } from "vue";
import { Navbar } from "../shared/Navbar";
export const MainLayout = defineComponent({
    setup: (props,context) => {
        return () => (
            <div>
                <nav>
                    <Navbar>
                        {{
                            tittle: () => context.slots.title?.(),
                            icon: () => context.slots.icon?.(),
                            default: () => context.slots.title?.(),
                        }}
                    </Navbar>
                </nav>
                
                {context.slots.default?.()}
                
            </div>
        )
    }
})