import {HEAD_LINE, USER_SIGNIN, USER_SIGNOUT, USER_REG, SHOW_PROGRESS} from './types'

export default {
  [USER_REG](state, token) {
    localStorage.setItem('jwt', token);
    state.token = token
  },
  [USER_SIGNIN](state, token) {
    localStorage.setItem('jwt', token);
    state.token = token
  },
  [USER_SIGNOUT](state) {
    localStorage.removeItem('jwt');
    state.token = null
  },
  [SHOW_PROGRESS](state, number){
    state.progress = number
  }
}
