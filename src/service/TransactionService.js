import * as router from "./Router";
import axios from 'axios';

export function addOneTransaction (params){
    return axios.post(`${router.baseUrl}${router.addOneTransaction}`,params).then(res => {
        return res;
    });
}

export function updateOneTransaction (params){
    return axios.post(`${router.baseUrl}${router.updateOneTransaction}`,params).then(res => {
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

export function getTranscationFromSameMerchant (params){
    return axios.post(`${router.baseUrl}${router.getTranscationFromSameMerchant}`,params).then(res => {
        return res;
    });
<<<<<<< HEAD

=======
>>>>>>> a56d92c6ee76588d0c61f01bd59c54f377b35fd3
}

export function getTotalFromTranscation (params){
    return axios.post(`${router.baseUrl}${router.getTotalFromTranscation}`,params).then(res => {
        return res;
    });
}

export function getDailyTotalFromTranscation (params){
    return axios.post(`${router.baseUrl}${router.getDailyTotalFromTranscation}`,params).then(res => {
        return res;
    });
}

export function getWeeklyTranscation (params){
    return axios.post(`${router.baseUrl}${router.getWeeklyTranscation}`,params).then(res => {
        return res;
    });
}