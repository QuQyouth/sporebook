import { WelcomeLayout } from "./WelcomeLayout";
import icon from '../../assets/icons/welcomeIcon.png'

export const WelcomeThird = () => {
    return (
        <WelcomeLayout>
            {{
                icon:()=><img src={icon} alt="" />,
                title:()=><>welcome3</>
            }}
        </WelcomeLayout>
    )
}
WelcomeThird.displayName = 'WelcomeThird'