import axios from './axios'

//获取搜索页面的信息
export const getSearchPageInfoReq = (params)=>{
    return axios({
        url: '/list',
        method: 'POST',
        data: params
    })
}