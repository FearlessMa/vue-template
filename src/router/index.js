import Vue from 'vue';
import Router from 'vue-router';
import store from 'src/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // 这个样式必须引入
import router from './routes';
NProgress.configure({ showSpinner: false }); // NProgress Configuration

const originalPush = Router.prototype.push;
// 重复路由报错问题
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const whiteList = ['/', 'login'];
const loginRoute = '/login';
const rootPath = '/';

Vue.use(Router);


router.beforeEach((to, from, next) => {
  NProgress.start();
  NProgress.inc();
  // whiteList.includes(to.redirectedFrom)
  if (whiteList.includes(to.name)) {
    next();
  } else {
    const userInfo = store.state.userInfo;
    //  首次登录 跟路由'/' redirect问题
    if (to.redirectedFrom == rootPath && !userInfo) {
      next({ path: loginRoute });
      return;
    }
    if (userInfo) {
      next();
      return;
    }
    store.dispatch('getUserInfo').then((res) => {
        if (res.code === 0) {
          const redirect = decodeURIComponent(from.query.redirect || to.path);
          if (to.path == redirect) {
            // set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true });
          } else {
            // 跳转到目的路由
            next({ path: redirect });
          }
        } else {
          next({ path: loginRoute, query: { redirect: to.fullPath } });
        }
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  }
});

router.afterEach((route) => {
  // these hooks do not get a next function and cannot affect the navigation
  NProgress.done(1.0);
});

export default router;
