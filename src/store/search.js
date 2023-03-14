import { getSearchPageInfoReq } from '@/api/search'
const state = {
    searchPageInfo:{}
}
const mutations = {
    GETSEARCHPAGEINFO(state, data){
        state.searchPageInfo = data
    }
}
const actions = {
    getSearchPageInfo(context, params={}){
        console.log("getSearchPageInfo");
        getSearchPageInfoReq(params).then(res=>{
            if(res.code === 200){
                context.commit('GETSEARCHPAGEINFO',res.data)
            }
        }).catch(error =>{
            console.log(error);
        })
    }
}
const getters = {
    trademarkList(state){
        // 空数组解决网速慢，v-for出错？
        // 有必要吗?我是通过computed计算出来用的
        return state.searchPageInfo.trademarkList || []
    },
    attrsList(state){
        return state.searchPageInfo.attrsList
    },
    goodsList(state){
        return state.searchPageInfo.goodsList
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}