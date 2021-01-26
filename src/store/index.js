/*
 * @Descripttion: 
 * @version: 
 * @Author: Empty
 * @Date: 2020-12-03 17:53:20
 * @LastEditors: Empty
 * @LastEditTime: 2020-12-09 09:32:13
 */
// import Vue from 'vue'
import { createStore } from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'


const store = createStore({
  modules: {
    app,
    user
  },
  getters
})

export default store
