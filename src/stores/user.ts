import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useStore = defineStore('user', {
  state: () => ({
    uid: Cookies.get('uid') ?? '', // 初始化 uid
    token: Cookies.get('csrf_token') ?? '' // 初始化 token
  }),
  getters: {
    // 获取 uid
    getUid: (state) => state.uid,
    // 获取 token
    getToken: (state) => state.token,
    // 判断用户是否已登录
    isLoggedIn: (state) => !!state.uid && !!state.token
  },
  actions: {
    reload() {
      this.uid = Cookies.get('uid') ?? ''
      this.token = Cookies.get('csrf_token') ?? ''
    }
  }
})
