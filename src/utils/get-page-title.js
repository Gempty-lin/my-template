/*
 * @Descripttion: 
 * @version: 
 * @Author: Empty
 * @Date: 2020-12-01 11:58:03
 * @LastEditors: Empty
 * @LastEditTime: 2020-12-01 12:04:18
 */

const title = 'Empty Template'

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}