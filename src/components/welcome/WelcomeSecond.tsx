import { WelcomeLayout } from "./WelcomeLayout";
import two from '../../assets/icons/welcome2.png'

export const WelcomeSecond = () => {
    return (
        <WelcomeLayout>
            {{
                icon:()=> <img src={two} alt="" />,
                title:()=><>纯净记账</>,
            }}
        </WelcomeLayout>
    )
}
WelcomeSecond.displayName = 'WelcomeSecond'