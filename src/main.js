import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import router from './router'
import store from './store';
import axios from 'axios';
import jsCookie from 'js-cookie'
import vueScrollBehavior from 'vue-scroll-behavior'
Vue.config.productionTip = false//抑制警告
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.prototype.axios=axios;
axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$axios = axios;
Vue.prototype.$cookie = jsCookie;
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
new Vue({
    axios,
	router,
	store,
	render: h => h(App),
}).$mount('#app')
