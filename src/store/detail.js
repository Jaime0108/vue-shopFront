import { getDetailPageInfoReq } from '@/api/detail'
const state = {
    detailPageInfo:{},
}
const mutations = {
    GETDETAILPAGEINFO(state,data){
        state.detailPageInfo = data
    }
}
const actions = {
    getDetailPageInfo({commit}, skuId){
        getDetailPageInfoReq(skuId).then(res=>{
            if(res.code === 200){
                commit('GETDETAILPAGEINFO', res.data)
            }
        })
    }
}
const getters = {
    categoryView(state){
        return state.detailPageInfo.categoryView || {}
    },
    skuInfo(state){
        return state.detailPageInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.detailPageInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}