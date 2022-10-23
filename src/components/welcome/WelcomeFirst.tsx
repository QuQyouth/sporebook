import {WelcomeLayout} from "./WelcomeLayout"
import icon from '../../assets/icons/welcomeIcon.png'

export const WelcomeFirst = () => {
    return <WelcomeLayout>
        {{
            icon: ()=> <img src={icon} alt="" />,
            title:()=><>welcome1</>
        }}
    </WelcomeLayout>
}

WelcomeFirst.displayName = 'WelcomeFirst'