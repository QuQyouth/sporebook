import {WelcomeLayout} from "./WelcomeLayout"
import one from '../../assets/icons/welcome1.png'
import welcome from '../../assets/icons/welcome.png'

export const WelcomeFirst = () => {
    return <WelcomeLayout>
        {{
            icon: ()=> <img src={one} alt="" />,
            title:()=> <img src={welcome} alt="" style={{width: '100%'}}/>
        }}
    </WelcomeLayout>
}

WelcomeFirst.displayName = 'WelcomeFirst'