import React, { Component } from 'react'

/* 引入login组件的样式 */
import './login.less'

/* 登录路由组件 */ 
export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <header className="login-header">
                    <img src={require('./img/logo.png')} alt=""/>
                    React后台管理系统
                </header>
                <section className="login-section"></section>
            </div>
        )
    }
}
