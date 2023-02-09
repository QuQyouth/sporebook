import { WelcomeLayout } from "./WelcomeLayout";
import icon from '../../assets/icons/welcome3.jpeg'

export const WelcomeThird = () => {
    return (
        <WelcomeLayout>
            {{
                icon:()=><img src={icon} alt="" />,
                title:()=><>丰富图表</>
            }}
        </WelcomeLayout>
    )
}
WelcomeThird.displayName = 'WelcomeThird'