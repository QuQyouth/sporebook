import {RouteRecordRaw} from "vue-router"
import { ActionsFirst } from "../components/welcome/ActionsFirst";
import { ActionsForth } from "../components/welcome/ActionsForth";
import { ActionsSecond } from "../components/welcome/ActionsSecond";
import { ActionsThird } from "../components/welcome/ActionsThird";
import { WelcomeFirst } from "../components/welcome/WelcomeFirst";
import { WelcomeForth } from "../components/welcome/WelcomeForth";
import { WelcomeSecond } from "../components/welcome/WelcomeSecond";
import { WelcomeThird } from "../components/welcome/WelcomeThird";
import { Welcome } from "../views/Welcome";

export const routes: RouteRecordRaw[] = [
    {path:'/', redirect: '/welcome'},
    {
        path:'/welcome',
        component: Welcome,
        children:[
            {path: '', redirect:'/welcome/1'},
            { path: '1', name:'Welcome1', components: { main: WelcomeFirst, footer: ActionsFirst }, },
            { path: '2', name:'Welcome2', components: { main: WelcomeSecond, footer: ActionsSecond }, },
            { path: '3', name:'Welcome3', components: { main: WelcomeThird, footer: ActionsThird }, },
            { path: '4', name:'Welcome4', components: { main: WelcomeForth, footer: ActionsForth }, },
        ]
    }
]