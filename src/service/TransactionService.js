import * as router from "./Router";
import axios from 'axios';

export function addOneTransaction (params){
    return axios.post(`${router.baseUrl}${router.addOneTransaction}`,params).then(res => {
        return res;
    });
}


export function getOneTranscationFromOneOrder (params){
    return axios.post(`${router.baseUrl}${router.getOneTranscationFromOneOrder}`,params).then(res => {
        return res;
    });
}

export function getTranscationFromSameOrder (params){
    return axios.post(`${router.baseUrl}${router.getTranscationFromSameOrder}`,params).then(res => {
        return res;
    });
}