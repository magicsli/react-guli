import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';


/* 引入login组件的样式 */
import './login.less'

/* 登录路由组件 */ 
 class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { username, password, remember}  = values;
                if (!/^[a-zA-Z0-9_-]{4,16}$/.test(username)){
                    message.error('用户名不正确');
                }
                if (!/^[a-zA-Z0-9]{4,10}$/.test(password)){
                    message.error('密码不能含有非法字符，长度在4-10之间');
                }
                    
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={require('./img/logo.png')} alt=""/>
                    <h2>React后台管理系统</h2>
                </header>
                <section className="login-section">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '用户名不能为空!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '密码不能为空!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="请输入密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <div className="tabpass">
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>记住密码</Checkbox>)}
                                <a href="/register" style={{ marginLeft: '12px' }}>没有账户?</a>
                            </div>
                           
                         
                            <Button style={{width:'100%'}} type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                           
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
export default Form.create({ name: 'normal_login' })(Login);
