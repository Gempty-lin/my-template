import axios from 'axios'
import { ElMessage , ElNotification ,ElMessageBox  } from 'element-plus';
import store from '@/store'
import { getToken } from '@/utils/auth'


let $sess = function(id, opt={}) {
    let obj = {}
    obj[id] = JSON.stringify(opt)
    return obj;
}

// 拦截器
// create an axios instance
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    baseURL: '/', // url = base url + request url
    timeout: 5000 // request timeout
    // withCredentials: true, // send cookies when cross-domain requests
})

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
        // if the custom code is not 20000, it is judged as an error.
        if (response.status !== 200) {
            ElMessage({
                message: response.status || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (response.status === 401) {
                // to re-login
                ElMessageBox('登陆超时或登录信息异常，需要重新登录', '重新登录', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(response.status || 'Error'))
        } else {
            if (res.RequestUrl == 'system/Login/checkwxlogin' && res.ResultCD != 200) {
                return Promise.reject(res)
            }
            if (res.ResultCD != 200) {
                ElMessage({
                    message: res.ErrorMsg || 'Error',
                    type: 'error',
                    duration: 5 * 1000
                })
                return Promise.reject(res)
            }
            return Promise.resolve(res)
        }
    },
    error => {
        // console.log('err' + error) // for debug
        ElMessage({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
// process.env.NODE_ENV === 'development'
// 拦截器



let api = async function(url, type, options, version, uploadfile = false){
    let data = {}
    if (!uploadfile) {
        let opt = options || {}
        data = $sess('info',opt)
    }

    service.interceptors.request.use(config => {
        // NProgress.start()
        if (store.getters.token) {
            config.headers['X-Token'] = getToken()
        }
        if (version) {
            config.headers['api-version'] = version;
        }
        if (uploadfile) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        return config
    }, error => {
        console.log(error)
        return Promise.reject(error)
    });
    if (type === 'POST' || type === 'post'){
        let res = await service({
            url: url,
            method: type,
            data
        })
        return res
    }else if(type === 'GET' || type === 'get'){
        return service({
            url: url,
            method: type,
            params:data
        })
    }

}
const request = (object)=>{
    return api(
        object.url,
        object.method,
        object.data,//传参
        object.version,//版本号
        object.isUploadfile //是否上传文件
    )
}


export default request
