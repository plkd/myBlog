import axios from 'axios';
import store from '../store';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const instance = axios.create();
const frontInstance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json';

if (localStorage.getItem('jwt')) {
  instance.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('jwt').replace(/(^")|("$)/g, '');
}

// axios 拦截请求
axios.interceptors.request.use = instance.interceptors.request.use =
  frontInstance.interceptors.request.use;
frontInstance.interceptors.request.use(config => {
  store.dispatch('showProgress', 20);
  return config
}, err => {
  return Promise.reject(err);
});
frontInstance.interceptors.response.use(config => {
  store.dispatch('showProgress', 100);
  return config
}, err => {
  return Promise.reject(err);
});

export default {
  // 注册
  localReg(data) {
    return axios.post('/api/reg', data);
  },
  localLogin(data) {
    return axios.post('/api/login', data);
  },
  // 获取文章列表{带分页获取}
  getArticleList(data) {
    return instance.post('/api/article/list', data);
  }
};
