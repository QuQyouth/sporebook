import {RouteRecordRaw} from "vue-router"
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
            {path: '1', component:WelcomeFirst},
            {path: '2', component:WelcomeSecond},
            {path: '3', component:WelcomeThird},
            {path: '4', component:WelcomeForth}
        ]
    }
]