import { method } from "lodash"
import axios  from "./axios"

// 获取用户地址
export const getUserAddressListReq = ()=>{
    return axios({
        url: 'user/userAddress/auth/findUserAddressList',
        method: 'GET'
    })
}

// 获取用户订单
export const getUserShopListReq = ()=>{
    return axios({
        url: '/order/auth/trade',
        method: 'GET'
    })
}

// 提交订单
export const submitOrderReq = (tradeNo,data)=>{
    return axios({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: 'POST',
        data
    })
}

// 获取二维码、总价格、订单号等信息
export const getErWeiMaReq = (orderId)=>{
    return axios({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'GET'
    })
}

// 获取支付状态
// payment/weixin/queryPayStatus/{orderId}
export const getPayStatusReq = (orderId)=>{
    return axios({
        url: `payment/weixin/queryPayStatus/${orderId}`,
        method: 'GET'
    })
}

// 获取个人中心页面的所有订单信息
export const getUserAllOrderReq = (page,limit)=>{
    return axios({
        url:`/order/auth/${page}/${limit}`,
        method: 'GET'
    })
}
