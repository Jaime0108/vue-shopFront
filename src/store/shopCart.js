import { addOrUpdataShopCartReq, getCartListReq, changeShopCheckedStateByIdReq, deleteShopInShopCartByIdReq } from '@/api/shopCart'

const state = {
    shopCartInfo: []
}
const mutations = {
    GETCARTLIST(state, res) {
        state.shopCartInfo = res
    }
}
const actions = {
    // addOrUpdataShopCart({ commit }, { skuId, skuNum }) {
    //    let res = addOrUpdataShopCartReq(skuId, skuNum).then(res => {
    //         if (res.code !== 200) {
    //             return Promise.reject(new Error('获取失败'))
    //         } else {
    //             return 'success'
    //         }
    //     })
    //          return res 
    // }
    async addOrUpdataShopCart({ commit }, { skuId, skuNum }) {
        // async声明的函数返回的结果必须是promise吗？
        let res = await addOrUpdataShopCartReq(skuId, skuNum)
        if (res.code == 200) {
            return 'success'
        } else {
            return Promise.reject(new Error('addOrUpdataShopCart-failed'))
        }
    },

    getCartList({ commit }) {
        getCartListReq().then(res => {
            if (res.code == 200) {
                commit('GETCARTLIST', res.data)
            }
        })
    },

    async changeSingleShopCheckedState({ commit }, { skuId, isChecked }) {
        let res = await changeShopCheckedStateByIdReq(skuId, isChecked)
        if (res.code == 200) {
            return 'success'
        } else {
            return Promise.reject(new Error('changeShopCheckedStateByIdReq-failed'))
        }
    },
    changeAllShopCheckedState({ dispatch, getters }, checked) {
        let promiseList = []
        checked = checked ? 1 : 0
        getters.realShopCartInfo.cartInfoList.forEach((shopInfo) => {
            let promise = dispatch('changeSingleShopCheckedState', { skuId: shopInfo.skuId, isChecked: checked })
            promiseList.push(promise)
        })
        return Promise.all(promiseList)
    },

    // deleteShopInShopCartById({ commit }, skuId) {
    //    let res =  deleteShopInShopCartByIdReq(skuId).then(res => {
    //         if (res.code == 200) {
    //             return 'success'
    //         } else {
    //             return Promise.reject(new Error('addOrUpdataShopCart-failed'))
    //         }
    //     })
    //     console.log('action-res:',res);
    //     return res
    // },
    async deleteShopInShopCartById({ commit }, skuId) {
        let res = await deleteShopInShopCartByIdReq(skuId)
        if (res.code == 200) {
            return 'success'
        } else {
            return Promise.reject(new Error('addOrUpdataShopCart-failed'))
        }
    },
    deleteAllSelectedShopInShopCart({dispatch,getters}){
        let promiseList = []
        getters.realShopCartInfo.cartInfoList.forEach(shopInfo=>{
            if(shopInfo.isChecked == 1){
                let promise = dispatch('deleteShopInShopCartById',shopInfo.skuId)
                promiseList.push(promise)
            }
        })
        return Promise.all(promiseList)
    }
}
const getters = {
    // 后端太辣鸡，返回的结果太恶心
    realShopCartInfo(state) {
        return state.shopCartInfo[0] || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}