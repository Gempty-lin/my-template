<!--
 * @Descripttion: play.js 一般用于手机版直播播放器，性能消耗大，一个页面只能使用一个
 * @version: 
 * @Author: Empty
 * @Date: 2020-11-30 16:37:02
 * @LastEditors: Empty
 * @LastEditTime: 2020-12-01 11:53:11
-->
<template>
    <div class="block__player">
        <!-- <div class="bullet" ref="bullet"></div> -->
        <div id="player" ref="player"></div>
    </div>
</template>
<script>
    import '@/utils/playerjs.js'
    export default {
        data() {
            return {
                playerJs: null,
                danmuPool: [],
                nowbullet:[],
                rowList:[],
            }
        },
        props: {
            liveRoomInfo: {
                type: Object,
                default: null
            },
            url:{
                type:String
            },
            poster:{
                type:String,
                default:null
            }
        },
        components: {

        },
        watch:{
            nowbullet(newVal,oldVal){
                this.CreatBullet(newVal);
            }
        },
        mounted() {
            this.initPlayer();
            this.$nextTick(() => {
                this.ListerVideo();
            })
        },
        methods: {
            // <video src="blob:https://fanxing.kugou.com/b988a93d-cedc-4fe5-8bcc-bf47cdafcdbc" style="position: relative;"></video>
            // blob:http://op.mtyee.com/355425a3-7176-4d86-aa6e-65c743f32ecd
            initPlayer() {
                let that = this;
                var player = new Playerjs({
                    id: 'player',
                    // file: 'blob:http://op.mtyee.com/355425a3-7176-4d86-aa6e-65c743f32ecd',
                    file: that.url,
                    poster: that.poster ? that.$base + that.poster : that.$live_bg,
                    unmute:true
                });
                player.api("unmute");
                player.api("play");

                this.playerJs = player;

                // this.$refs.bullet.style.height = `${this.$refs.player.clientHeight-34}px`;
            },
            // x5全屏播放判断
            ListerVideo() {
                let that = this;
                this.$refs.player.addEventListener("error", e=>{
                    console.log("playererr",e)
                    this.$emit("errorPlayer",e)
                });
                let myVideo = document.getElementsByTagName('video')[0];
                myVideo.addEventListener("x5videoenterfullscreen", function () {
                    alert("进入全屏");
                })
                myVideo.addEventListener("x5videoexitfullscreen", function () {
                    that.initPlayer()
                    // that.playerJs.api("play");
                })
            },


            // 弹幕的测试
            testsend(){
                let i = 0;
                setInterval(() => {
                    this.nowbullet.push(this.danmuPool[i]);
                    i++;
                }, 1500);
            },
            hasrowList(fn){
                let row = Math.round(Math.random()*9);
                this.rowList.push(row);
                return row;
            },
            CreatBullet(newVal){
                let newBulletEle = document.createElement('div');
                let row = Math.round(Math.random()*9);
                let time = 8000
                newBulletEle.setAttribute('class','barrager_font');
                newBulletEle.innerHTML = newVal[newVal.length-1];
                newBulletEle.style.cssText = `
                    top:${row*14}px;
                    position: absolute;
                    user-select: none;
                    white-space: pre;
                    pointer-events: none;
                    perspective: 500px;
                    display: inline-block;
                    will-change: transform;
                    transform: translateX(375px);
                    transition: -webkit-transform 7.5s linear 0s;
                    z-index:10001;
                `;
                this.$refs.bullet.appendChild(newBulletEle);
                setTimeout(()=>{
                    newBulletEle.style.transform = "translateX(-375px)"
                });
                setTimeout(() => {
                    this.$refs.bullet.removeChild(newBulletEle);
                }, 7500);
            }
        }
    }
</script>
<style lang="less" scoped>
    .block__player {
        position: relative;
        z-index: 100;
    }

    #player {
        width: 100%;
        height: 211px;
    }

    .bullet {
        position: absolute;
        font-size: 12px;
        color: #fff;
        text-shadow: rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px;
        white-space: pre;
        font-family: SimHei, "Microsoft JhengHei", Arial, Helvetica, sans-serif;
        perspective: 500px;
        user-select: none;
        z-index: 1;
        .barrager_font{

        }
    }
</style>
