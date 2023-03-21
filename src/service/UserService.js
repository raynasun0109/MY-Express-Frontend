import * as router from "./Router";
import axios from 'axios';

export function getOneUser (params){
    return axios.post(`${router.baseUrl}${router.getOneUser}`,params).then(res => {
        return res;
    });
}

export function registerOneUser (params){
    return axios.post(`${router.baseUrl}${router.registerOneUser}`,params).then(res => {
        return res;
    });
}

export function userLogin (params){
    return axios.post(`${router.baseUrl}${router.userLogin}`,params).then(res => {
        return res;
    });
}