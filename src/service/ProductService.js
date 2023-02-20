import * as router from "./Router";
import axios from 'axios';

export function allProducts (){
    return axios.get(`${router.baseUrl}${router.allProducts}`).then(res => {
        return res;
    });
}
