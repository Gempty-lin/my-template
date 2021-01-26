/*
 * @Descripttion: 
 * @version: 
 * @Author: Empty
 * @Date: 2020-12-07 11:40:17
 * @LastEditors: Empty
 * @LastEditTime: 2020-12-18 11:35:59
 */
const install = function(Vue,opt={}){
    Vue.directive('lazy',{
        mounted(el,binding) {
            let LoadingImg = opt.loadingImg;
            let ErrorImg = opt.errorImg;
            let initImg = binding.value;
            // 判断绑定值是对象还是字符串
            if (typeof binding.value == "object") {
                LoadingImg = binding.value.loading || opt.loadingImg;
                ErrorImg = binding.value.error || opt.errorImg;
                initImg = binding.value.src;
            }
            // 先赋值加载中的图片
            el.src = LoadingImg;
            // 获取v-lazy 里面的值
            // https://img.0757ty.com/undefined 处理这种情况
            let Url = initImg;
            if (opt.baseUrl) {
                let url = initImg
                let reg = new RegExp(opt.baseUrl);
                Url = url.replace(reg,"");
            }
            //
            
            if ((Url !== 'undefined' && Url !== 'null' && Url !== 'NULL') && Url) {
                el.src = initImg;
            }else{
                el.src = ErrorImg;
            }
            el.addEventListener('error',e=>{
                el.src = ErrorImg;              
            });
            el.addEventListener('abort',e=>{
                el.src = ErrorImg;                
            });
            el.addEventListener('load',e=>{
                
            });
        },
    })
}
if(typeof window !== 'undefined' && window.Vue){
    install(window.Vue);
}
export default install;