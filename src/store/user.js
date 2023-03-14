import { getVerificationCodeReq, registerConfirmReq, loginAndGetTokenReq, getUserInfoReq, logoutReq } from '@/api/users'
import { setLoginToken, getLoginToken, removeLoginToken } from '@/utils/token'

const state = {
    token: getLoginToken(),
    userInfo: {},

}
const mutations = {
    LOGINANDGETTOKEN(state, data) {
        state.token = data
        
    },
    GETUSERINFO(state, data) {
        state.userInfo = data
    },
    LOGOUTANDCLEARLOCALTOKEN(state) {
        state.userInfo = {}
        state.token = {}
        removeLoginToken()
    },

}
const actions = {
    // 获取验证码
    async getVerificationCode({ commit }, phone) {
        let res = await getVerificationCodeReq(phone)
        //    console.log(res);
        if (res.code == 200) {
            // 这也写到state里，真的笑死
            return res.data
        } else {
            return Promise.reject(new Error(res.message))
        }
    },

    // 注册
    async registerConfirm({ commit }, registerInfoObj) {
        let res = await registerConfirmReq(registerInfoObj)
        // console.log(res);
        if (res.code == 200) {
            return res.message
        } else {
            return Promise.reject(new Error(res.message))
        }
    },

    // 登录获取token
    async loginAndGetToken({ commit }, loginInfoObj) {
        let res = await loginAndGetTokenReq(loginInfoObj)
        if (res.code == 200) {
            commit('LOGINANDGETTOKEN', res.data.token)
            setLoginToken(res.data.token)
            return 'getTokenSuccess'
        } else {
            return Promise.reject(new Error(res.message))
        }
    },

    // 获取用户信息,在路由守卫中使用
    async getUserInfo({ commit }) {
        let res = await getUserInfoReq()
        if (res.code == 200) {
            commit('GETUSERINFO', res.data)
            return 'getUserInfo-success'
        } else {
            return Promise.reject(new Error('getUserInfo-faile'))
        }
    },

    // 退出登录
    async logoutAndClearLocalToken({commit}) {
        let res = await logoutReq()
        if (res.code == 200) {
            commit('LOGOUTANDCLEARLOCALTOKEN')
        }
    },


}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}