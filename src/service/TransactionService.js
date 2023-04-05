import * as router from "./Router";
import axios from 'axios';

export function addOneTransaction (params){
    return axios.post(`${router.baseUrl}${router.addOneTransaction}`,params).then(res => {
        return res;
    });
}