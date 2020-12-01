/*
 * @Author: your name
 * @Date: 2020-06-09 11:11:45
 * @LastEditTime: 2020-08-25 16:39:15
 * @LastEditors: Empty
 * @Description: In User Settings Edit
 * @FilePath: \js-\websocket.js
 */

import store from '@/store';
import router from "@/router"

//  initWebSocket('地址');
//  sendSock('需要发送的消息','回调函数');
//  接受到的数据看 websocketonmessage;
var global_callback = null;
var websock = null;

function sleep(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while (new Date().getTime() < startTime) {}
};



var heartCheck = {
    timeout: 50000, //55s发一次心跳
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function() {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function() {
        var self = this;
        this.timeoutObj = setTimeout(function() {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            sendSock(`{"actionType":"ping"}`, () => {
                // console.log("客户端 to 服务端 ping!!!" + new Date())
            })
            self.serverTimeoutObj = setTimeout(function() { //如果超过一定时间还没重置，说明后端主动断开了
                websock.close(); //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, self.timeout)
        }, this.timeout)
    }
}

// socket初始化
function initWebSocket(url, reconnect = false, onmsg = websocketonmessage) { //初始化weosocket
    //ws地址
    var wsuri = `${url}`;
    websock = new WebSocket(wsuri);
    websock.onmessage = function(e) {
        // 心跳重置
        heartCheck.reset();
        heartCheck.start();
        onmsg(e);
    }
    websock.onopen = function() {
        // 心跳重置
        heartCheck.reset();
        heartCheck.start();
        console.log("ws连接成功!" + new Date());
        // 判断用户是否登录了，登录则websock登录
        if (store.state.user_info) {
            let user_info = {
                actionType: "login",
                user_id: store.state.user_info.user.id,
                client_type: 1,
                portrait: store.state.user_info.user.file_path ? store.state.user_info.user.file_path:null,
                nickname: store.state.user_info.user.nickname ? store.state.user_info.user.nickname : null,
                auth_token: store.state.user_info.auth_token ? store.state.user_info.auth_token : store.state.auth_token
            }
            sendSock(JSON.stringify(user_info));
        }
        if (router.history.current.name == "liveRoom" && reconnect) {
            let info = {
                actionType: "join_group",
                group_id: router.history.current.params.id,
                is_h5: 1
            }
            sendSock(JSON.stringify(info));
        }
    }

    // 连接关闭
    websock.onclose = function(e) {
            console.log("ws连接关闭...1s后尝试重连......" + new Date(), e.code , e);
            //连接失败后，5s尝试重连
            let CloseTime = setTimeout(function() {
                clearTimeout(CloseTime);
                initWebSocket(url, true, onmsg);
            }, 1000);
        }
        //连接发生错误的回调方法
        // websock.onerror = function() {
        //     console.log("WebSocket连接发生错误，尝试重连中......");
        //     //连接失败后，尝试重连
        //     let ErrorTime = setTimeout(function() {
        //         clearTimeout(ErrorTime);
        //         initWebSocket(url, true);
        //     }, 5000);
        // }
}



// 发送消息
function sendSock(agentData, callback) {
    global_callback = callback;
    if (websock.readyState === websock.OPEN) {
        //若是ws开启状态
        websock.send(agentData, callback);
    } else if (websock.readyState === websock.CONNECTING) {
        // 若是 正在开启状态，则等待1s后重新调用
        let sendTime = setTimeout(function() {
            sendSock(agentData, callback);
            clearTimeout(sendTime);
        }, 3000);
    } else {
        // 若未开启 ，则等待1s后重新调用
        let sendTime = setTimeout(function() {
            sendSock(agentData, callback);
            clearTimeout(sendTime);
        }, 3000);
    }
}
//数据接收
function websocketonmessage(e) {
    let data = JSON.parse(e.data);

    let type = data.actionType;
    let form;
    switch (type) {
        case "init":
            form = {
                actionType: data.actionType,
                user_id: "0"
            }
            form = JSON.stringify(form)
            sendSock(form, (res) => {
                console.log(res, "发送成功")
            });
            break;
        case "clout_notice":
            form = {
                actionType: "clout_notice",
                msg: "xxxx",
                url: "xxxx"
            }
            break;
        case "sys_pong":
            // console.log("服务端 to 客户端 pong!!")
            break;
        default:
            // console.log(data)
            break;
    }
    if (global_callback != null && global_callback != "" && global_callback != undefined) {
        global_callback(JSON.parse(e.data));
    }
    return JSON.parse(e.data);
}


export { sendSock, initWebSocket, websock, websocketonmessage, heartCheck }
