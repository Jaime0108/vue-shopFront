import axios from './axios'

// 获取注册验证码
export const getVerificationCodeReq = (phone)=>{
    return axios({
        url: `/user/passport/sendCode/${phone}`,
        method: 'GET'
    })
}

// 注册
export const registerConfirmReq = (data)=>{
    return axios({
        url: '/user/passport/register',
        method: 'POST',
        data
    })
}

// 登录拿token
export const loginAndGetTokenReq = (data)=>{
    return axios({
        url: '/user/passport/login',
        method: 'POST',
        data
    })
}

// 用token拿用户信息
export const getUserInfoReq = ()=>{
    return axios({
        url: '/user/passport/auth/getUserInfo',
        method: 'GET'
    })
}

// 退出登录
export const logoutReq = ()=>{
    return axios({
        url: '/user/passport/logout',
        method: 'GET'
    })
}

