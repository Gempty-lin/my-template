/*
 * @Descripttion: 
 * @version: 
 * @Author: Empty
 * @Date: 2020-12-01 16:48:23
 * @LastEditors: Empty
 * @LastEditTime: 2020-12-01 16:49:10
 */
import Cookies from 'js-cookie'

const TokenKey = 'vue_empty_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
