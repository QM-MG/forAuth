import axios from 'axios';
import util from '@/common/util';
import ajaxHeader from '@/common/ajaxHeader';
import Vue from 'vue';

const STATUS_401 = 401;
const STATUS_402 = 402;

axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.resolve(error.response);
});

let headers = ajaxHeader();
// 创建axios实例
const instance = axios.create({
    timeout: 1000 * 30,
    headers
});
// 设置headers
instance.defaults.headers.common['isajax'] = true;
// 之前是通过version区分版本，19.06.13之后不在区分教育版和通用版，统一成generic
// const version = util.getLocaltonParam().version || 'generic';
const version = 'generic';

export default {
    request(url, opt = {}) {
        opt.params = opt.params || {};
        if (version === 'generic' && !opt.params.notVersion) {
            url = '/crm/web/generic' + url;
        }
        if (opt.isFile) {
            url = url.replace('/crm/web/', '/crm/download/');
        }
        if (opt.httpFile) {
            url = url.replace('/crm/web/', '/crm/http/');
        }
        return new Promise((resolve, reject) => {
            let params = {
                method: opt.type || 'POST',
                url: url
            };
            if (opt.isFile) {
                params.responseType = opt.responseType;
            }
            // 发送请求当前页面hash
            let hashFrom = window.location.hash || '';
            params.data = JSON.stringify(opt.params);
            opt.type === 'GET' && (params.params = opt.params);
            instance(params).then(res => {
                if (res.status === 200) {
                    // 请求返回时页面hash
                    let hashTo = window.location.hash || '';
                    // 解决路由切换后，上个页面promise仍然返回的问题
                    if (hashFrom !== hashTo) {
                        // util.loading(new Vue()).close();
                        return;
                    }
                    const body = res.data;
                    const status = Number(body.code !== undefined ? body.code : body.status);
                    if (status === STATUS_401 || status === STATUS_402) {
                        body.msg = statusText[status];
                    }
                    else if (status > 9000) {
                        body.msg = body.msg;
                    }
                    else if (status !== 0) {
                        body.msg = statusText['other'];
                    }

                    if (+body.code === 0 || +body.status === 0) {
                        resolve(body);
                    }
                    else if (+body.code === 401) {
                        window.open('/businessfe/index.html#/login', '_top');
                    }
                    else if (opt.isFile) {
                        resolve(body);
                    }
                    else {
                        reject(body);
                    }
                }
            }).catch(
                response => {
                    let hashTo = window.location.hash || '';
                    // 解决路由切换后，上个页面promise仍然返回问题
                    if (hashFrom !== hashTo) {
                        util.loading(new Vue()).close();
                        return;
                    }
                    response.msg = statusText['other'];
                    reject(response);
                }
            );
        });
    }
};

