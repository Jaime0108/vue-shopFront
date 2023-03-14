import axios from './axios'
import mockAjax from './mockAjax'

// 获取TypeNav数据
export const getBaseCategoryListReq = ()=>{
    return axios({
        method: 'GET',
        url: '/product/getBaseCategoryList'
    })
}
// 获取banner轮播图数据
export const getBannerImgListReq = ()=>{
    return mockAjax({
        method: 'GET',
        url: '/banner'
    })
}
// 获取floor数据
export const getFloorImgListReq = ()=>{
    return mockAjax({
        method: 'GET',
        url: '/floor'
    })
}