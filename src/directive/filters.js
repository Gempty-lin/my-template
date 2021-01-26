/*
 * @Descripttion: 由于过滤器在3.0中移除了，所以这些方法只能引用，在computed中使用
 * @version: 
 * @Author: Empty
 * @Date: 2020-08-15 18:05:56
 * @LastEditors: Empty
 * @LastEditTime: 2020-12-07 11:49:20
 */
// 过滤父级属性为null的字段
export function filtersKeys(obj, item, tips = "暂无数据") {
    let keys = obj.split(".");
    for (let index = 1; index < keys.length; index++) {
        let str = "item.";
        for (let i = 1; i < index + 1; i++) {
            if (index != i) {
                str = str + keys[i] + "."
            } else {
                str = str + keys[i]
            }
        }
        if (!eval(str)) {
            return tips
        }
        if (keys.length - 1 == index) {
            return eval(str)
        }
    }
}

export function filetersDate(date, fmt) {
    let padLeftZero = function(str) {
        return ('00' + str).substr(str.length);
    }
    date = new Date(date * 1000);
    fmt = fmt || 'yyyy-MM-dd hh:mm'
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
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
    return fmt;
}

