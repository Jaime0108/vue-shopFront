import axios from './axios'

export const getDetailPageInfoReq = (skuId)=>{
    return axios({
        url: `/item/${skuId}`,
        method: 'GET',
    })
}