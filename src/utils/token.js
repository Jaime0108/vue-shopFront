export const setLoginToken = (token)=>{
    window.localStorage.setItem('loginToken', token)
}

export const getLoginToken = ()=>{
    return window.localStorage.getItem('loginToken')
}

export const removeLoginToken = ()=>{
    window.localStorage.removeItem('loginToken')
}