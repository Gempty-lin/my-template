/*
 * @Descripttion: 
 * @version: 
 * @Author: Empty
 * @Date: 2020-11-30 16:24:14
 * @LastEditors: Empty
 * @LastEditTime: 2020-12-23 17:00:01
 */
import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';


let appVue = createApp(App);

// 路由守卫
import "@/router/permission";
// 自定义指令
import ImgOrder from "@/directive/imgLazy.js";
import directive from '@/directive'

// 是否移动端
appVue.config.globalProperties.$is_mobile = function () {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    return flag;
};
appVue.config.globalProperties.$formatDate = function (date, fmt, is_week = false) {
    const padLeftZero = (str) => {
        return ('00' + str).substr(str.length);
    }

    date = new Date(date * 1000);
    fmt = fmt || 'yyyy-MM-dd hh:mm';
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    };
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }

    if (is_week) {
        let dateArr = ["日", "一", "二", "三", "四", "五", "六"];
        let day = dateArr[date.getDay()];
        return fmt + ' 星期' + day
    }


    return fmt;
};
appVue.config.globalProperties.$pickupkey = (Array, key) => {
    let newArray = []
    for (let i = 0; i < Array.length; i++) {
        const ele = Array[i];
        newArray[i] = ele[key];
    }
    return newArray
}
appVue.config.globalProperties.$ArrayRecursion = (array, result = []) => {
    if (array.length === 0) {
        return result;
    }
    if (result.length === 0) {
        result = array.shift();
        return this.getCombines(array, result)
    } else {
        let arrItem = array.shift();
        let emtpyArr = [];
        result.forEach(ele => {
            arrItem.forEach(msg => {
                if (typeof ele === 'object') {
                    emtpyArr.push([...ele, msg])
                } else {
                    emtpyArr.push([ele, msg])
                }
            })
        });
        return this.getCombines(array, emtpyArr);
    }
}

appVue.config.globalProperties.$base = 'https://img.0757ty.com/';

appVue.config.globalProperties.$live_bg = require('@/assets/images/def_img.gif')

// 自定义指令使用
appVue.use(ImgOrder, {
    loadingImg: require('@/assets/images/def_bili.gif'),
    errorImg: require('@/assets/images/def_img.gif'),
    baseUrl: 'https://img.0757ty.com/',
});
appVue.use(directive);

appVue.use(ElementPlus, { size: 'small', zIndex: 3000 });
appVue.use(store).use(router).mount('#app');