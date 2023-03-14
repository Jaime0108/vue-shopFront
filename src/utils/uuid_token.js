import { v4 as uuidv4 } from 'uuid';

export const getUUID = ()=>{
    let sph_uuid_token = window.localStorage.getItem('sph_uuid_token')
    if(!sph_uuid_token){
        sph_uuid_token = uuidv4()
        window.localStorage.setItem('sph_uuid_token',sph_uuid_token)

    }
    return sph_uuid_token
}