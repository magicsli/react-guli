/* 发送异步ajax请求的函数模块 */
import axios from 'axios'

export default function ajax (url, data = {}, method = "get") {

    if (method === 'get' ) {
        return axios[method]( url, { params: data } )
    }else{
        return axios[method]( url, data )
    }
   
}
