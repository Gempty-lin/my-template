/*
 * @Descripttion: 
 * @version: 
 * @Author: Empty
 * @Date: 2020-12-18 11:32:44
 * @LastEditors: Empty
 * @LastEditTime: 2020-12-18 11:51:33
 */
const longpress = {
    beforeMount: function (el, binding, vNode) {
        if (typeof binding.value !== 'function') {
            throw 'callback must be a function'
        }
        // 定义变量
        let pressTimer = null
        // 创建计时器（ 2秒后执行函数 ）
        let start = (e) => {
            if (e.type === 'click' && e.button !== 0) {
                return
            }
            if (pressTimer === null) {
                pressTimer = setTimeout(() => {
                    handler()
                }, 2000)
            }
        }
        // 取消计时器
        let cancel = (e) => {
            if (pressTimer !== null) {
                clearTimeout(pressTimer)
                pressTimer = null
            }
        }
        // 运行函数
        const handler = (e) => {
            binding.value(e)
        }
        // 添加事件监听器
        el.addEventListener('mousedown', start)
        el.addEventListener('touchstart', start)
        // 取消计时器
        el.addEventListener('click', cancel)
        el.addEventListener('mouseout', cancel)
        el.addEventListener('touchend', cancel)
        el.addEventListener('touchcancel', cancel)
    },
    // 当传进来的值更新的时候触发
    updated(el, { value }) {
        el.$value = value
    },
    // 指令与元素解绑的时候，移除事件绑定
    unmounted(el) {
        el.removeEventListener('click', el.handler)
    },
}

export default longpress