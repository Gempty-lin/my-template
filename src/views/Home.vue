<!--
 * @Descripttion: 
 * @version: 
 * @Author: Empty
 * @Date: 2020-11-30 16:24:14
 * @LastEditors: Empty
 * @LastEditTime: 2020-12-01 17:59:20
-->

<template>
    <div id="app">
        {{name}}
        <img :src="require('@/assets/images/def_img.gif')" alt="">
        <p>{{age}}</p>
        <button @click="plusOne()">+</button>
    </div>
</template>

<script>
    import { ref , getCurrentInstance } from 'vue'
    export default {
        name: 'app',
        data() {
            return {
                name: 'xiaosan'
            }
        },
        setup() {
            const name = ref('小四')
            const age = ref(18)
            const vm = getCurrentInstance();
            console.log(vm.$store)
            function plusOne() {
                age.value++ //想改变值或获取值 必须.value
            }
            return { //必须返回 模板中才能使用
                name,
                age,
                plusOne
            }
        }
    }
</script>