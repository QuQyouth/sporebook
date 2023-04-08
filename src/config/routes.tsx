import {RouteRecordRaw} from "vue-router"
import { ItemCreate } from "../components/item/ItemCreate";
import { ItemList } from "../components/item/ItemList";
import { TagCreate } from "../components/tag/TagCreate";
import { TagEdit } from "../components/tag/TagEdit";
import { ActionsFirst } from "../components/welcome/ActionsFirst";
import { ActionsForth } from "../components/welcome/ActionsForth";
import { ActionsSecond } from "../components/welcome/ActionsSecond";
import { ActionsThird } from "../components/welcome/ActionsThird";
import { WelcomeFirst } from "../components/welcome/WelcomeFirst";
import { WelcomeForth } from "../components/welcome/WelcomeForth";
import { WelcomeSecond } from "../components/welcome/WelcomeSecond";
import { WelcomeThird } from "../components/welcome/WelcomeThird";
import { ItemPage } from "../views/ItemPage";
import { SignInPage } from "../views/SignInPage";
import { StartPage } from "../views/StartPage";
import { StatisticsPage } from "../views/StatisticsPage";
import { TagPage } from "../views/TagPage";
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
    },
    {path:'/start', name:'Start', component: StartPage},
    {
        path: '/items', name:'Items', component: ItemPage,
        children: [
            {path: '', name:'ItemList', component: ItemList},
            {path: 'create', name:'ItemCreate', component: ItemCreate}
        ]
    },
    {
        path: '/tags', name:'Tags', component: TagPage,
        children: [
            {path: 'create', name:'TagCreate', component: TagCreate},
            {path: ':id/edit', name:'TagEdit', component: TagEdit}
        ]
    },
    {
        path: '/sign_in',name:'SignIn', component: SignInPage
    },
    {
        path: '/statistics', name:'StatisticsPage', component: StatisticsPage
    }
]