import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import routes from './routes';

Vue.use(VueRouter);
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }
  return {x: 0, y: 0}
};
const router = new VueRouter({
  mode: 'history',
  scrollBehavior,
  routes
});

router.beforeEach(({meta, path}, from, next) => {
  store.dispatch('showProgress', 0);
  let {auth = true} = meta;
  let isLogin = Boolean(store.state.token);
  /*
        访问不需要权限的设置meta:false
        注册也要设置成meta:false
    */
  if (auth && !isLogin && path !== '/login') {
    return next({path: '/login'});
  }
  // 如果登录了以后再访问reg和login则路由到Home
  if (isLogin && (path === '/login' || path === '/reg')) {
    return next({path: '/admin'});
  }
  next();
});
export default router;
