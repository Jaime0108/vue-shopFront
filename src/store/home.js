import { getBaseCategoryListReq, getBannerImgListReq, getFloorImgListReq } from "@/api/home";
const state = {
    baseCategoryList: [],
    bannerImgList: [],
    floorImgList: []
}

const mutations = {
    GETBASECATEGORYLIST(state, data) {
        state.baseCategoryList = data
    },
    GETBANNERIMGLIST(state, data) {
        state.bannerImgList = data
    },
    GETFLOORIMGLIST(state, data) {
        state.floorImgList = data
    }
}

const actions = {
    getBaseCategoryList({ commit }) {
        console.log('getBaseCategoryList');
        getBaseCategoryListReq().then(res => {
            if (res.code === 200) {
                // console.log(res.data);
                commit('GETBASECATEGORYLIST', res.data)
            } else {
                console.log(`home-store: ${res.msg}`);
            }
        }).catch((error) => {
            console.log(error);
        })

    },
    getBannerImgList({ commit }) {
        getBannerImgListReq().then(res => {
            if (res.code === 200) {
                commit('GETBANNERIMGLIST', res.data)
                // console.log("数据回来了");
            } else {
                console.log(`home-store: 获取bannerImgList失败`);
            }
        })

    },
    getFloorImgList(context) {
        getFloorImgListReq().then(res => {
            if (res.code === 200) {
                context.commit('GETFLOORIMGLIST', res.data)
            }
        })
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}