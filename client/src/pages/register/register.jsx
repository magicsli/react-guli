import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import { Link, Redirect} from 'react-router-dom'

import { connect } from 'react-redux';

// 这个register中需传入一个user对象, 例: { username:admin. password:1234 }
import { register } from '../../redux/action'

/* 引入login组件的样式 */
import '../../assets/css/login.less'

/* 登录路由组件 */
class Rigister extends Component {

    state = {
        redirectTo : false
    }

    handleSubmit = e => {  // 点击注册按钮, 数据验证 => 触发注册提交 => 得到返回数据判断是否成功
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { username, password, password2 } = values;
                if (!/^[a-zA-Z0-9_-]{4,16}$/.test(username)) {
                    message.error('用户名非法');
                    return
                }
                if (!/^[a-zA-Z0-9]{4,16}$/.test(password)) {
                    message.error('密码非法');
                    return
                }
                if( password !== password2 ){
                    message.error('密码不一致');
                    return
                }
                this.handleRegister( values )
            }
        });
    };

    handleRegister = async (user) => {  // 注册提交, 将数据发送给action => 获取redux的返回数据
         await this.props.register(user);
         const {msg, _id} = this.props.user;
         if (msg) {
              message.error(msg)
            }else{
              localStorage._id = _id;
             message.success("注册成功, 将在三秒后跳转到主界面", 3, () => {
                 this.setState({ redirectTo: true})
             })
            }
         
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            this.state.redirectTo
             ? <Redirect to= '/' />
             :<div className="login">
                <header className="login-header">
                    <img src={require('../../assets/img/logo.png')} alt="" />
                    <h2>React后台管理系统账号注册</h2>
                </header>
                <section className="login-section register">
                    <h2>注册账号</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, wit: true, message: '用户名不能为空!' },
                                    { min: 4, message: '用户名至少4位' },
                                    { max: 12, message: "用户名最多12位" },
                                    { pattern: /^[a-zA-Z0-9_-]+/, message: "用户名必须是英文,数字或下划线组成" }
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: '密码不能为空!' },
                                    { min: 4, message: "密码至少4位" },
                                    { max: 16, message: "密码最多16位" },
                                    { pattern: /^[a-zA-Z0-9_]+/, message: '密码必须是英文, 数字或下划线组成' }

                                ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="请输入密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password2', {
                                rules: [
                                    { required: true, message: '密码不能为空!' },
                                    { min: 4, message: "密码至少4位" },
                                    { max: 16, message: "密码最多16位" },
                                    { pattern: /^[a-zA-Z0-9_]+/, message: '密码必须是英文, 数字或下划线组成' }

                                ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password2"
                                    placeholder="请再次确认密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item style={{textAlign: 'right' }}>
                            <Button style={{ width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
                                注册
                            </Button>
                            <Link to="/login" style={{ marginLeft: '12px' }}>立即登录</Link>

                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
export default connect(
    state => ({ user: state.user}),
    { register }
)(Form.create({ name: 'normal_login' })(Rigister))
