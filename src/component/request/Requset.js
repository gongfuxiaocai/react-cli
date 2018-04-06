import axios from 'axios';
import Tip from './Tip';
const CancelToken = axios.CancelToken;
const requestUrl = {};

export default function request (method, url, data, flag) {
    if( !!requestUrl[ url ] ){
        return Promise.resolve( false );
    } else {
        requestUrl[ url ] = url;
    }

    method = method.toUpperCase();
    let cancel;
    let instance = axios.create({

        withCredentials: true, //表示跨域请求时是否需要使用凭证
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        transformRequest: [function (data) {
            let ret = [];
            for (let it in data) {
                ret.push( encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) );
            }
            return ret.join('&');
        }],
        cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
        })

    });

    //这里 响应拦截器 根据服务器返回的status 做判断 如果无权限就跳转到指定页面
    instance.interceptors.response.use(function (res) {
        const requestData = res.data;
        if( !requestData.status && !!requestData.error && requestData.error.code === "common.not.login" ){
            Tip.show( { key: "login", type: "login", content: "登录超时，请重新登录!" } );
            return false;
        }

        if( flag === 1 && !requestData.status ) {
            if( !!requestData.error.message && requestData.error.message === "您无权进行该操作" ) {
                return false;
            }

            const msg = !!requestData.error.message ? requestData.error.message : "服务器繁忙，请稍后重试！";
            Tip.show( { key: "error", type: "fail", content: msg } );
            return false;
        }

        if( flag === 2 ) {
            if( !requestData.status ) {
                const msg = !!requestData.error.message ? requestData.error.message : "服务器繁忙，请稍后重试！";
                Tip.show( { key: url, type: "fail", content: msg } );
                return false;
            } else {
                Tip.show( { key: url, type: "success", content: "操作成功！" }, 2000 );
            }

        }

        return requestData;

    }, function (error) {
        Tip.show( { key: "error", type: "fail", content: "服务器繁忙，请稍后重试！" } );

        return Promise.reject( error );
    });

    if(method==="GET"){
        let getInstance = instance.get( url,{
            params: data
        }).then((res)=>{
            delete requestUrl[ url ];
            return res;
        });
        getInstance.cancel = () => {
            cancel('cancelled');
        };
        return getInstance;
    }

    if(method==="POST"){
        let postInstance = instance.post(url,data).then((res)=>{
            delete requestUrl[ url ];
            return res;
        });
        postInstance.cancel = () => {
            cancel('cancelled');
        };
        return postInstance;
    }

}

export const Get = (url, data, flag) => request('GET', url, data, flag);
export const Post = (url, data, flag) => request('POST', url, data, flag);
