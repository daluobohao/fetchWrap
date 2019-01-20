import _ from 'lodash';
import "isomorphic-fetch";
import "es6-promise";
// 封装fetch
class httpFetch {
    // 检查响应状态
    checkStatus(response) {
        if(response.status >= 200 && response.status < 300) { // 响应成功
            return response;
        }
        if(response.status === 301 || response.status === 302) { // 重定向
            window.location = response.headers.get('Location');
        }
        const error = new Error(response.statusText);
        error.data = response;
        throw error;
    }

    // 解析返回的结果
    async parseResult(response) {
        console.log('parseResult response:',response);
        const contentType = response.headers.get('Content-Type');
        if(contentType !== null) {
            if(contentType.indexOf('text') > -1) {
                return await response.text();
            }
            if(contentType.indexOf('form') > -1) {
                return await response.formData();
            }
            if(contentType.indexOf('video') > -1) {
                return await response.blob();
            }
            if(contentType.indexOf('json') > -1) {
                return await response.json();
            }
        }
        return await response.text();
    }

    // 组合判断状态和结果解析
    async processResult(response) {
        let _response = this.checkStatus(response);
        _response = await this.parseResult(_response);
        return _response;
    }

    /**
     * 序列化参数 (get)
     * @param {any} obj
     * @returns
     */
    serialiseObject (obj) {
        const prefix = '?';
        if (obj && Object.keys(obj).length) {
        return prefix + Object.keys(obj).map(key =>
            `${key}=${encodeURIComponent(obj[key])}`
        ).join('&')
        }
        return ''
    }
  
    // 封装fetch的request请求
    async _request(url, init, headers = {}, config = {}) {
        try {
            let options = _.assign(
                {
                    credentials: 'include', // 允许跨域
                },
                init
            );
            options.headers = Object.assign({}, options.headers || {}, headers || {});
            let response = await fetch(url, options);
            response = await this.processResult(response);
            return response;
        } catch(err) {
            throw err;
            return null;
        }
    }

    // get请求
    async get(api, data = {}, headers = {}, config = {}) {
        const query = _.isEmpty(data) ? '' : serialiseObject(data);
        return await this._request(`${api}${query}`, headers, {}, config);
    }

    // post请求
    async post(api, data = {}, headers = {}, config = {}) {
        const _headers = {
            'Content-Type': 'application/x-wwww-form-urlencoded',
            ...headers,
        };
        let formBody = null;
        if(_headers['Content-Type'] && _headers['Content-Type'].indexOf('application/x-www-form-urlencoded') > -1) {
            formBody = new URLSearchParams();
            for (let key in data) {
                if(typeof(data[key] === 'object')) {
                    formBody.append(key, JSON.stringify(data[key]));
                } else {
                    formBody.append(key, data[key]);
                }
            }
        }
        return await this._request(
            api,
            {
                method: 'POST',
                headers: _headers,
                body: formBody,
            },
            {},
            config,
        )
    }
}

let fetchWrap = new httpFetch();

export { fetchWrap }