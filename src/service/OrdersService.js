import * as router from "./Router";
import axios from 'axios';

export function addOneOrder (params){
    return axios.post(`${router.baseUrl}${router.addOneOrder}`,params).then(res => {
        return res;
    });
}

export function getOrdersFromOneUser (params){
    return axios.post(`${router.baseUrl}${router.getOrdersFromOneUser}`,params).then(res => {
        return res;
    });
}