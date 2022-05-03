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

Vue.use(Router);
let r = new Router({})
r.beforeEach((to, from, next) => {
/* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
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
        }, {
            path: '/movieDetail/:mid',
            name: 'movieDetail',
            component: movieDetail,
            props: true,
            meta: {
                title: 'HERec 电影详情'
            }
        },
        {
            path: '*',
            component: notFound
        }
    ]
})
