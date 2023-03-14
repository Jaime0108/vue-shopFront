import axios from './axios'

// /api/cart/addToCart/{ skuId }/{ skuNum }
export const addOrUpdataShopCartReq = (skuId, skuNum) =>{
    return axios({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'POST',
    })
}

export const getCartListReq = () =>{
    return axios({
        url: '/cart/cartList',
        method: 'GET',
    })
}

// 切换单个商品是否选中，在后端保持
export const changeShopCheckedStateByIdReq = (skuId, isChecked)=>{
    return axios({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'GET'
    })
}

// /cart/deleteCart/{skuId}
export const deleteShopInShopCartByIdReq = (skuId)=>{
    return axios({
        url:`/cart/deleteCart/${skuId}`,
        method: 'DELETE'
    })
}

