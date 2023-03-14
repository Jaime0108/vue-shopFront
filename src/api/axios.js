import axios from 'axios'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import { getUUID } from '@/utils/uuid_token'
import { getLoginToken } from '@/utils/token'

const instance = axios.create({
    baseURL: '/api',
    timeout: 3000,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 利用uuid生成一个临时身份加入请求头，userTempId字段后台规定的
    if(getLoginToken()){
        config.headers.token = getLoginToken()
    }else{
        config.headers.userTempId = getUUID()
    }
    nprogress.start()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(`请求拦截器报错${error}`);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    nprogress.done()
    response = response.data
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(`响应拦截器报错${error}`);
});

export default instance