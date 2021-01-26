/*
 * @Descripttion: 
 * @version: 
 * @Author: Empty
 * @Date: 2020-12-14 14:56:30
 * @LastEditors: Empty
 * @LastEditTime: 2020-12-18 11:44:50
 */
// 复制
import copy from './copy';
// 元素点击几次或长按
import longpress from './longpress';
// 拖拽
import draggable from './draggable'
// 自定义指令
const directives = {
    copy,
    longpress,
    draggable
}
export default {
    install(Vue) {
        Object.keys(directives).forEach((key) => {
            Vue.directive(key, directives[key])
        })
    },
}