import { Component } from "react";

/**
 * fetch request header, can customize the header content
 * @type {{Accept: string, Content-Type: string, accessToken: *}}
 */
let header = {
    Accept: "application/json",
    "Content-Type": "application/json"
};

/**
 * GET get the URL
 * @param url request URL
 * @param params requested parameter
 * @returns {*}
 */
const handleUrl = (url) => (params) => {
    if (params) {
        let paramsArray = [];
        Object.keys(params).forEach((key) =>
            paramsArray.push(key + "=" + encodeURIComponent(params[key]))
        );
        if (url.search(/\?/) === -1) {
            //eslint-disable-next-line no-unused-expressions
            typeof params === "object" ? (url += "?" + paramsArray.join("&")) : url
        } else {
            url += "&" + paramsArray.join("&");
        }
    }
    return url;
};

/**
 * fetch network handling
 * @param original_promise original fetch
 * @param timeout exceed 30s
 * @returns {Promise.<*>}
 */
const timeoutFetch = (originalFetch, timeout = 30000) => {
    let timeoutBlock = () => {};
    let timeoutPromise = new Promise((resolve, reject) => {
        timeoutBlock = () => {
            reject("timeout promise");
        };
    });

    // Promise.race(iterable) return a promise
    let abortablePromise = Promise.race([originalFetch, timeoutPromise]);

    setTimeout(() => {
        timeoutBlock();
    }, timeout);

    return abortablePromise;
};

/**
 * network request utils
 */
export default class HttpUtils extends Component {
    /**
     * base on fetch encapsulated GET request
     * @param url request URL
     * @param params request parameter
     * @returns {Promise}
     */
    static getRequest = (url, params = {}) => {
        return timeoutFetch(
            fetch(handleUrl(url)(params), {
                method: "GET",
                headers: header
            })
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("Server is busy");
                }
            })
            .then((response) => {
                if (response) {
                    return response;
                } else {
                    return response;
                }
            })
            .catch((error) => {});
    };
    /**
     * based on fetch encapsulated POST request
     * @param url request URL
     * @param params request parameter
     * @returns {Promise}
     */
    static postRequest = (url, params = {}) => {
        // let formData = new FormData();
        // Object.keys(params).forEach((key) => formData.append(key, params[key]));
        return timeoutFetch(
            fetch(url, {
                mode: "cors",
                method: "POST",
                headers: header,
                body: JSON.stringify(params)
            })
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("Service busy\r\nCode:" + response.status);
                }
            })
            .then((response) => {
                if (response && response.code === 200) {
                    return response;
                } else {
                    return response;
                }
            })
            .catch((error) => {
                console.log("Internet error");
            });
    };
}

