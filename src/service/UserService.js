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

export function updateOneUser (params){
    return axios.post(`${router.baseUrl}${router.updateOneUser}`,params).then(res => {
        return res;
    });
}

export function userLogin (params){
    return axios.post(`${router.baseUrl}${router.userLogin}`,params).then(res => {
        return res;
    });
}

export function updateOneShoppingCart (params){
    return axios.post(`${router.baseUrl}${router.updateOneShoppingCart}`,params).then(res => {
        return res;
    });
}

export function fetchOneShoppingCart (params){
    return axios.post(`${router.baseUrl}${router.fetchOneShoppingCart}`,params).then(res => {
        return res;
    });
}