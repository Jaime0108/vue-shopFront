import { getUserAddressListReq, getUserShopListReq, submitOrderReq, getErWeiMaReq, getPayStatusReq, getUserAllOrderReq} from '@/api/order'

const state = {
    userAddressList: [],
    userShopList: [],
}
const mutations = {
    GETUSERADDRESSLIST(state, data) {
        state.userAddressList = data
    },
    GETUSERSHOPLIST(state, data) {
        state.userShopList = data
    }
}
const actions = {
    // 获取用户地址列表
    getUserAddressList({ commit }) {
        getUserAddressListReq().then(res => {
            commit('GETUSERADDRESSLIST', res.data)
        })
    },

    // 获取订单列表
    getUserShopList({ commit }) {
        getUserShopListReq().then(res => {
            commit('GETUSERSHOPLIST', res.data)
        })
    },
    
    // 提交订单
   async submitOrder({commit}, data){
         let res = await submitOrderReq(data.tradeNo, data)
         console.log(res);
         if(res.code == 200){
            return res.data
         }else{
            return Promise.reject(new Error(res.message))
         }
    },
    // 获取二维码、订单号、总价格等信息
   async getErWeiMa({commit}, orderId){
        let res = await getErWeiMaReq(orderId)
        console.log(res);
        if(res.code == 200){
            return res.data
        }else{
            return Promise.reject(new Error(res.message))
        }
    },
    
    // 获取支付状态
    async getPayStatus({commit}, orderId){
       let res = await getPayStatusReq(orderId)
        return res
    },

    // 获取个人中心页面所有订单信息
   async getUserAllOrder({commit}, {page, limit}){
        let res = await getUserAllOrderReq(page, limit)
        if(res.code == 200){
            return res.data
        }else{
            return Promise.reject(new Error(res.message))
        }
    }
}
const getters = {
    
}

export default {
    state,
    mutations,
    actions,
    getters
}