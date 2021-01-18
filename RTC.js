RTC
MediaRecorder



let Media = new MediaRecorder(t.state.outputStream, {
    mimeType: "video/webm;codecs=h264",
    videoBitsPerSecond: 2097152
})
Media.addEventListener("dataavailable", (function (e) {
    t.websocket && t.websocket.send(e.data)
}))
Media.addEventListener("stop", (function () {
    t.websocket && (t.websocket.close(), t.websocket = null, t.props.onPubstart(!1))
}))
Media.start(40)


// 1.RTC 获取视频流（屏幕录制或者摄像头） navigator.mediaDevices.getDisplayMedia
// 2.需要混音则  MediaStream.addTrack() 将音频轨迹添加进去 
// 3.new MediaRecorder 用视频流获取bold 
// 4.将 bold 和 推流地址通过 socket 发送到流服务器（用 node.js + ffmpeg ） https://www.jb51.net/article/128471.htm