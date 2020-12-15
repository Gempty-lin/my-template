<!--
 * @Descripttion: 
 * @version: 
 * @Author: Empty
 * @Date: 2020-12-02 09:58:47
 * @LastEditors: Empty
 * @LastEditTime: 2020-12-09 12:05:20
-->
<template>
    <div class="vue3_demo">
        <div class="bigbox">
            <div class="title">ref</div>
            <div class="box">
                <div class="label">输入框：</div>
                <input type="text" v-model="objData.name">
            </div>
            <div class="box">
                <div class="label">objData.name:</div>
                <div class="context">{{objData.name}}</div>
            </div>
            <div class="box">
                <div class="label">输入框：</div>
                <input type="text" v-model="objData.other">
            </div>
            <div class="box">
                <div class="label">ref：</div>
                <div class="context">{{objData.other}}</div>
            </div>

            <div class="box">
                <div class="label">输入框：</div>
                <input type="text" v-model="printData.other">
            </div>
            <div class="btn" @click="Print"> 打印</div>
            {{printData}}

        </div>
        
    </div>
</template>
<script>
import { getCurrentInstance, ref, toRefs, unref } from 'vue';
export default {
    setup(){
        /*
            ref
            1.ref 响应参数，跟双向绑定差不多；
            2.如果对象是ref ，直接赋值则都会响应，跟浅复制一个道理；
            3.unref处理过后的参数并不会转换成响应式；
        */ 
        let vm = getCurrentInstance();
        console.log(vm)
        const objData = ref({
            name:"成",
            age:18,
            address:{
                city:"佛山",
                p:"广东"
            }
        });
        // 使用unref后，printData不是响应参数
        let printData = toRefs(objData);
        const Print = ()=>{
            printData = unref(objData.value.name);
            console.log(printData);
            // printData.value = objData.value;
        }
        return{
            objData,
            printData,
            Print
        }
    }
}
</script>

<style lang="scss" scoped>
.vue3_demo{
    width: 1440px;max-width: 100%;
    margin: 0 auto;
    padding-top: 16px;
    .bigbox{
        .title{
            font-size: 18px;color: #333;font-weight: bold;
            margin-bottom: 18px;
        }
        .box{
            display: flex;
            align-items: center;
            font-size: 14px;color: #333;
            margin-bottom: 16px;
            .label{
                font-size: 14px;color: #fff;margin-right: 8px;
                background: #999;
                padding: 4px 16px;border-radius: 6px;
            }
            input{
                outline: none;
                
            }
        }
        .btn{
            font-size: 14px;color: #fff;margin-right: 8px;
            background: $baseColor;
            padding: 4px 16px;border-radius: 6px;
            width: 30px;text-align: center;
            cursor: pointer;
        }
    }
}

</style>