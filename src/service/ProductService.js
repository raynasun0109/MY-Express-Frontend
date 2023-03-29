import * as router from "./Router";
import axios from 'axios';

export function allProducts (){
    return axios.get(`${router.baseUrl}${router.allProducts}`).then(res => {
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