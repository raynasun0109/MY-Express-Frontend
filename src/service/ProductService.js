import * as router from "./Router";
import axios from 'axios';

export function allProducts (params){
    return axios.post(`${router.baseUrl}${router.allProducts}`,params).then(res => {
        return res;
    });
}

export function latestProducts (params){
    return axios.post(`${router.baseUrl}${router.latestProducts}`,params).then(res => {
        return res;
    });
}


export function getOneProduct (params){
    return axios.post(`${router.baseUrl}${router.getOneProduct}`,params).then(res => {
        return res;
    });
}

export function deleteOneProduct (params){
    return axios.post(`${router.baseUrl}${router.deleteOneProduct}`,params).then(res => {
        return res;
    });
}

export function updateOneProduct (params){
    return axios.post(`${router.baseUrl}${router.updateOneProduct}`,params).then(res => {
        return res;
    });
}

export function addOneProduct (params){
    return axios.post(`${router.baseUrl}${router.addOneProduct}`,params).then(res => {
        return res;
    });
}

export function getProductsFromMerchant (params){
    return axios.post(`${router.baseUrl}${router.getProductsFromMerchant}`,params).then(res => {
        return res;
    });
}
