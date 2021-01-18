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
        <video ref="RecordingVideo" controls autoplay playsinline style="height: 620px;">
        </video>
        <!-- <embed ref="RecordingVideo" id="rtmp-streamer" bgcolor="#999999" quality="high" width="320" height="240" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" /> -->
        <button>推</button>
    </div>
</template>
<script>
    import liveVideo from '@/components/LivePlayer'
    import { nextTick, ref } from 'vue';
    import rtmpStreamer from 'rtmp-streamer';
    import axios from 'axios'
    import TRTC from 'trtc-js-sdk';
    export default {
        components: {
            liveVideo
        },
        setup() {
            let RecordingVideo = ref(null)
            navigator.getUserMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;


            // 屏幕录制
            let ScreenRecording;
            let Media;
            async function getFlashLive() {
                let streamer = new rtmpStreamer(RecordingVideo.value);
                console.log(streamer)
                // streamer.publish()
            }
            // getFlashLive();
            async function PublishLive() {
                // 验证WebRTC是否存在
                try {
                    let AudioTrack;

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
                    let Recording = await navigator.mediaDevices.getDisplayMedia(gdmOptions)


                    navigator.getUserMedia({
                        video: false,
                        audio: true
                    }, (stream) => {
                        // stream 是 流数据 （音视）
                        // URL.createObjectURL 无法转换 需要换成现在用的模式
                        // var video = RecordingVideo.value;

                        // 合成音频
                        AudioTrack = stream.getAudioTracks()
                        Recording.addTrack(AudioTrack[0]);
                        let video = RecordingVideo.value;
                        video.srcObject = Recording;
                        Media = new MediaRecorder(Recording, {
                            mimeType: "video/webm;codecs=h264",
                            videoBitsPerSecond: 2097152
                        });

                        // Media.addEventListener("dataavailable", (function (e) {
                        //     // t.websocket && t.websocket.send(e.data)
                        //     console.log(e)
                        //     axios.post(
                        //         'http://qcy311.com/api/Test/testLive',
                        //         { pushUrl:'rtmp://livepush.0757ty.com/live/3f2fd1a06c607932?txSecret=4df2b9ac487617a394f11bfa40b431bf&txTime=600A9B55',data:e}
                        //     ).then(res=>{
                        //         console.log(res)
                        //     })

                        // }))
                        Media.addEventListener("stop", (function () {
                            // t.websocket && (t.websocket.close(), t.websocket = null, t.props.onPubstart(!1))
                        }))
                        Media.start(500);
                    }, (err) => {
                        console.error("navigator.getUserMedia 错误: ", err);
                    });
                } catch (e) {
                    console.error(e)
                }
            }
            // PublishLive();
            async function TRTCLive() {
                let localStream = TRTC.createStream({ userId: "63", audio: true, screen: true });
                localStream.initialize().then((stream) => {
                    // console.log('initialize localStream success');
                    // 本地流初始化成功，可通过Client.publish(localStream)发布本地音视频流
                    let video = RecordingVideo.value;
                    video = localStream
                    console.log(localStream)
                    console.log(video)
                    // video.srcObject = localStream;
                    let options = {
                        mode: 'live',
                        userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwmbGUNHilOzEgoLMFCUrQxMDAxNzM2MzQ4hMakVBZlEqUNzU1NTIwMAAIlqSmQsSMzM0sDQztLAwh5qSmQ40NDjJIC8pyiysuKTYOci7qtTF1M3FI8UpsyoqKzEzN608Iy0pzT-CxTzKNd9WqRYARWQwpw__',
                        sdkAppId: 1400476361,
                        userId: "63",
                        streamId: "4edcc26791f9597a"
                    }
                    let client = TRTC.createClient({ mode: 'rtc', ...options });
                    client.join({ roomId: 2249, role: 'anchor' }).then(() => {
                        client.switchRole('anchor').then(() => {
                            // 连麦观众角色切换为主播，开始推流
                            client.publish(localStream);
                        });
                    });

                }).catch(error => {
                    console.error('failed initialize localStream ' + error);
                });
                // console.log()




            }
            TRTCLive()
            return {
                RecordingVideo
            }
        }
    }
</script>