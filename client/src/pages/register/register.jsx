import React, { Component } from 'react'


/* 登录路由组件 */ 
export default class Register extends Component {
    render() {
        return (
            <div style={{width:'100%', height:'100%', overflow:'hidden', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#f5f5f5',
            fontSize:24, textAlign:'center'}}>
                请联系后台管理员为您注册账号, 由于安全问题, 本系统不提供注册功能<br />
                测试账号: 用户名: admin;  密码: 1234
            </div>
        )
    }
}
