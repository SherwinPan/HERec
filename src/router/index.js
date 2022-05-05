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
            path:'searchMovie/:mName',
            name:'searchMovie',
            component:searchMovie,
            props:true,
            meta:{
                title:'HERec 电影搜寻结果'
            }
        },
        {
            path:'searchPerson/:pName',
            name:'searchPerson',
            component:searchPerson,
            props:true,
            meta:{
                title:'HERec 影人搜寻结果'
            }
        },

        {
            path: '*',
            component: notFound
        }
    ]
})
