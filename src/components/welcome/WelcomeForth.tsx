import { WelcomeLayout } from "./WelcomeLayout";
import icon from '../../assets/icons/welcomeIcon.png'

export const WelcomeForth = () => {
        return (
            <WelcomeLayout>
                {{
                    icon:() => <img src={icon} alt="" />,
                    title:() => <>welcome4</>,
                }}
            </WelcomeLayout>
        )
    }

WelcomeForth.displayName = 'WelcomeForth'