/*
 * @Descripttion: 
 * @version: 
 * @Author: Empty
 * @Date: 2020-12-18 11:36:31
 * @LastEditors: Empty
 * @LastEditTime: 2020-12-21 16:07:12
 */
const draggable = {
    mounted: function (el) {
        el.style.cursor = 'move';
        // el.style.position = 'absolute';
        el.onmousedown = function (e) {
            let disx = e.pageX - el.offsetLeft
            let disy = e.pageY - el.offsetTop
            document.onmousemove = function (e) {
                let x = e.pageX - disx
                let y = e.pageY - disy
                let maxX = document.body.clientWidth - parseInt(window.getComputedStyle(el).width)
                let maxY = document.body.clientHeight - parseInt(window.getComputedStyle(el).height)
                if (x < 0) {
                    x = 0
                } else if (x > maxX) {
                    x = maxX
                }

                if (y < 0) {
                    y = 0
                } else if (y > maxY) {
                    y = maxY
                }

                el.style.left = x + 'px'
                el.style.top = y + 'px'
            }
            document.onmouseup = function (el) {
                document.onmousemove = document.onmouseup = null;
                
            }
        }
    },
}
export default draggable