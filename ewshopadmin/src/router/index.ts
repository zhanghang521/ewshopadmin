import { createRouter, createWebHistory, } from "vue-router";
import dashboard from "./modules/dashboard"
const Login = ()=>import('@/views/login/index.vue')
const Home = ()=>import('@/views/Home.vue')
const DashBoard = ()=>import('@/views/dashboard/index.vue')
const routes =[
    // 这里添加路由配置
    {
        path:'/',
        redirect:'/dashboard/console'
    },
    {
        path: '/login',
        component: Login,
        name:'Login',
        meta: {
            title: '登录'
        }
    }

];

const baseRoutes = [...routes,...dashboard]
console.log(baseRoutes)

const router = createRouter({
    history: createWebHistory(),
    routes:baseRoutes
});
router.beforeEach((to,from,next)=>{
    document.title =to.meta.title
    console.log(to.meta.title)
    //判断是否是  login 页面
    if (to.name != 'Login') {
        //不是 login 页面 则需要验证token是否存在
        if (!localStorage.getItem('token')) {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    }
    next()
})
export default router;

