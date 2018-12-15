//异步引入组件，提升首页加载效率
const Main = resolve=>require(['../main/Main'],resolve)
const Login = resolve=>require(['../main/Login'],resolve)
const Home = resolve=>require(['../main/Home'],resolve)
//定义所有子页面
const pages=[
    { path: 'home', component: Home },



]
//定义总框架
const router =new VueRouter({
    mode:'history',
    routes: [
        {path: '/',name: 'main',component: Main,meta: { title: '' },children:pages},
        {path: '*',redirect: '/'},
        {path: '/login',name: 'login',component: Login,meta: { title: '' }},
    ]
})
//修改每个路由的标题
router.beforeEach((to, from, next) => {
    if (to.meta.title) {//如果设置标题，拦截后设置标题
        document.title = to.meta.title
    }
    next()
})
export default router;