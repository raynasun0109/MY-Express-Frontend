import * as router from "./Router";
import HttpUtils from "../utils/HttpUtils";

export function allProducts() {
    return HttpUtils.getRequest(`${router.baseUrl}${router.allProducts}`)
}

