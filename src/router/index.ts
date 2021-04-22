import {RouteRecordRaw,createRouter,createWebHistory} from "vue-router";
import { checkLogin } from "./login";

const demo = () => import("../view/Demo.vue");
const login = ()=>import("../view/Login.vue");

const routes:RouteRecordRaw[] = [{
    path:"/",
    component:demo
},{
    path:"/login",
    component:login
},{
    path:"/:pathMatch(.*)*",
    redirect:"/"
}];

const router = createRouter({
    history: createWebHistory(),
    routes
});

checkLogin(router);

export default router;