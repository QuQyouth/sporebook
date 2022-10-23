import { WelcomeLayout } from "./WelcomeLayout";
import icon from '../../assets/icons/welcomeIcon.png'

export const WelcomeSecond = () => {
    return (
        <WelcomeLayout>
            {{
                icon:()=> <img src={icon} alt="" />,
                title:()=><>welcome2</>,
            }}
        </WelcomeLayout>
    )
}
WelcomeSecond.displayName = 'WelcomeSecond'