import Vue from 'vue'
import api from '../api'
import router from '../router'
import MsgAlert from './MsgAlert'
import {SHOW_PROGRESS, USER_REG, USER_SIGNIN, USER_SIGNOUT} from "./types";

export default {
  // 后台注册
  UserReg({commit}, data) {
    api.localReg(data).then(data => {
      if (data.code === 200) {
        commit('USER_REG', data.token)
        router.replace({path: '/admin'})
      } else {
        MsgAlert(data.message)
      }
    }).catch(err => {
      MsgAlert(err.toString())
    })
  },
  //  后台登录
  UserLogin({commit}, data) {
    api.localLogin(data).then(data => {
      if (data.code === 200) {
        commit('USER_SIGNIN', data.token)
      } else {
        MsgAlert(data.message)
      }
    }).catch(err => {
      MsgAlert(err.toString())
    })
  },
  UserLogout({commit}) {
    commit('USER_SIGNOUT');
    router.push({path: '/login'})
  },
  showProgress({commit}, number) {
    commit('SHOW_PROGRESS', number)
  }
}
