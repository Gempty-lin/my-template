<!--
 * @Descripttion:video.js 播放器，一般用于pc端 
 * @version: 
 * @Author: Empty
 * @Date: 2020-11-30 16:37:02
 * @LastEditors: Empty
 * @LastEditTime: 2020-12-01 11:51:05
-->
<template>
    <div class="player__main">
        <div class="player_content hide_pro">
            <video ref="videoPlayer" class="video-js"></video>
        </div>
    </div>
</template>
<script>
    import videojs from 'video.js';
    import 'video.js/dist/video-js.css'
    export default {
        data() {
            return {
                // playUrl:"https://video.0757ty.com/64346eedvodcq1259199430/934761525285890808038278057/playlist.f5.mp4",
                options:{
                    controls: true, // 是否显示控制条
                    poster: this.$def_live, // 视频封面图地址
                    preload: 'auto',
                    autoplay: true,
                    fluid: true, // 自适应宽高
                    language: 'zh-CN', // 设置语言
                    muted: false, // 是否静音
                    inactivityTimeout: false,
                    sources:[ // 视频源
                        {
                            src: this.playUrl,
                            type: this.is_live?'application/x-mpegURL':'video/mp4',
                            poster: this.$def_live
                        }
                    ],
                    // controlBar: { // 设置控制条组件
                    //     /* 设置控制条里面组件的相关属性及显示与否
                    //     'currentTimeDisplay':true,
                    //     'timeDivider':true,
                    //     'durationDisplay':true,
                    //     'remainingTimeDisplay':false,
                    //     volumePanel: {
                    //         inline: false,
                    //     }
                    //     */
                    //     /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
                    //     children: [
                    //         {name: 'playToggle'}, // 播放按钮
                    //         {name: 'currentTimeDisplay'}, // 当前已播放时间
                    //         {name: 'progressControl'}, // 播放进度条
                    //         {name: 'durationDisplay'}, // 总时间
                    //         { // 倍数播放
                    //             name: 'playbackRateMenuButton',
                    //             'playbackRates': [0.5, 1, 1.5, 2, 2.5]
                    //         },
                    //         {
                    //             name: 'volumePanel', // 音量控制
                    //             inline: false, // 不使用水平方式
                    //         },
                    //         {name: 'FullscreenToggle'} // 全屏
                    //     ]
                    // },
                }
            }
        },
        props: {
            playUrl: {
                type: String,
                default: ""
            },
            is_live:{
                type:Boolean,
                default:true
            }
        },
        mounted() {
            // let that = this;
            this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
                this.on('error',(e)=>{
                    this.errorDisplay.close();
                })
            })
        },
        beforeDestroy() {
            if (this.player) {
                this.player.dispose()
            }
        },
        methods: {
       
        }
    }
</script>
<style lang="scss" scoped>
    .player__main {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .hide_pro{
            ::v-deep.plyr__controls .plyr__controls__item.plyr__progress__container{
                display: none;
            }
        }
    }
    
</style>