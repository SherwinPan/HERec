import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue'
import {
    log10
} from 'core-js/core/number';
import log from '@/pages/log'
import home from '@/pages/Home'
import rec from '@/components/rec'
import movieDetail from '@/pages/movieDetail'
import notFound from "@/pages/NotFound";
import  me from '@/pages/me';
import personDetail from '@/pages/personDetail';
import searchMovie from '@/pages/searchMovie';
import searchPerson from "@/pages/searchPerson";
import createMovie from "@/pages/createMovie";
import modifyMovie from "@/pages/modifyMovie";
import createPerson from "@/pages/createPerson";
import modifyPerson from "@/pages/modifyPerson";
import classicMovie from "@/pages/classicMovie";
import newMovie from "@/pages/newMovie";
import popularMovie from "@/pages/popularMovie";
Vue.use(Router);
// let r = new Router({})
// r.beforeEach((to, from, next) => {
// /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   next()
// })
// export default r;
export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
            meta: {
                title: '首页'
            },
            children: [{
                path: '/',
                component: rec,
                meta: {
                    title: "rec"
                }
            },
                {
                    path: '/rec',
                    component: rec,
                    meta: {
                        title: "rec"
                    }
                }

            ],
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            meta: {
                title: 'HERecMovie'
            }
        },
        {
            path: '/log',
            name: 'log',
            component: log,
            meta: {
                title: 'HERec 登录'
            }
        },
        {
            path: '/movieDetail/:mid',
            name: 'movieDetail',
            component: movieDetail,
            props: true,
            meta: {
                title: 'HERec 电影详情'
            }
        },
        {
            path: '/personDetail/:pid',
            name: 'personDetail',
            component: personDetail,
            props: true,
            meta: {
                title: 'HERec 电影人详情'
            }
        },
        {
            path:'/me',
            name:'me',
            component:me,
            props:true,
            meta:{
                title:'HERec 个人中心'
            }
        },
        {
            path:'/searchMovie/:mName',
            name:'searchMovie',
            component:searchMovie,
            props:true,
            meta:{
                title:'HERec 电影搜寻结果'
            }
        },
        {
            path:'/searchPerson/:pName',
            name:'searchPerson',
            component:searchPerson,
            props:true,
            meta:{
                title:'HERec 影人搜寻结果'
            }
        },
        {
            path:'/createMovie',
            name:'createMovie',
            component:createMovie,
            meta:{
                title:'HERec 增加电影',
            }
        },
        {
            path:'/modifyMovie/:mid',
            name:'modifyMovie',
            component:modifyMovie,
            props:true,
            meta:{
                title: "HERec 修改电影信息"
            }
        },
        {
            path:'/createPerson',
            name:'createPerson',
            component:createPerson,
            meta:{
                title:'HERec 增加影人',
            }
        },
        {
            path:'/modifyPerson/:pid',
            name:'modifyPerson',
            component:modifyPerson,
            props:true,
            meta:{
                title: "HERec 修改影人信息"
            }
        },
        {
            path:'/classicMovie',
            name:'classicMovie',
            component:classicMovie,
            meta:{
                title: "HERec 经典排行"
            }
        },
        {
            path:'/newMovie',
            name:'newMovie',
            component:newMovie,
            meta:{
                title: "HERec 最新电影"
            }
        },
        {
            path:'/popularMovie',
            name:'popularMovie',
            component:popularMovie,
            meta:{
                title: "HERec 上新热门"
            }
        },

        {
            path: '*',
            component: notFound
        }
    ]
})
