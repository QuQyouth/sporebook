import { WelcomeLayout } from "./WelcomeLayout";
import icon from '../../assets/icons/welcome4.jpg'

export const WelcomeForth = () => {
        return (
            <WelcomeLayout>
                {{
                    icon:() => <img src={icon} alt="" style={{height: '100%'}} />,
                    title:() => <>记账提醒</>,
                }}
            </WelcomeLayout>
        )
    }

WelcomeForth.displayName = 'WelcomeForth'