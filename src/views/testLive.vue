<!--
 * @Descripttion: 
 * @version: 
 * @Author: Empty
 * @Date: 2021-01-08 10:11:13
 * @LastEditors: Empty
 * @LastEditTime: 2021-01-08 17:10:02
-->
<template>
    <div>
        <!-- <div style="width:500px">
            <liveVideo :playUrl="`https://liveplay.0757ty.com/live/f2188a1e7a56487b.m3u8`" :is_live="true"></liveVideo>
        </div> -->
        <!-- <video 
            ref="RecordingVideo"
            controls 
            autoplay 
            playsinline 
            style="height: 620px;"
        >
        </video> -->
        <embed ref="RecordingVideo" id="rtmp-streamer" bgcolor="#999999" quality="high" width="320" height="240" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" />
        <!-- video/webm -->
        <!-- <embed ref="RecordingVideo" id="rtmp-streamer" bgcolor="#999999" quality="high" width="320" height="240" allowScriptAccess="sameDomain" type="video/webm" /> -->
        <button>推</button>
    </div>
</template>
<script>
import liveVideo from '@/components/LivePlayer'
import { nextTick, ref } from 'vue';
import rtmpStreamer from 'rtmp-streamer';
    export default {
        components:{
            liveVideo
        },
        setup() {
            let RecordingVideo = ref(null)
            navigator.getUserMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;

            
            let streamer = rtmpStreamer;
            // 屏幕录制
            let ScreenRecording;
            // 验证WebRTC是否存在
            try{
                // 存在则发起授权询问
                // navigator.getUserMedia({
                //     video: false,
                //     audio: true
                // }, (stream)=>{
                //     // stream 是 流数据 （音视）
                //     // URL.createObjectURL 无法转换 需要换成现在用的模式
                //     var video = RecordingVideo.value;
                    
                //     console.dir(stream.getAudioTracks);
                //     // video.srcObject = stream;
                //     // video.onloadedmetadata = function(e) {
                //     //     video.play();
                //     // };
                // }, (err)=>{
                //     console.error("navigator.getUserMedia 错误: ", err);
                // })
                const gdmOptions = {
                    video: {
                        cursor: "never" //always 显示鼠标
                    },
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        sampleRate: 44100
                    }
                }
                navigator.mediaDevices.getDisplayMedia(gdmOptions).then(Recording=>{
                    console.dir(Recording)
                    let video = RecordingVideo.value;
                    console.dir(video)
                    video.srcObject = Recording;
                });
            }catch(e){
                console.error(e)
            }
            // streamer.publish()
            

            return {
                RecordingVideo
            }
        }
    }
</script>