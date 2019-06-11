import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { Link, Redirect} from 'react-router-dom'

import { connect } from 'react-redux'; 

// 这个action 需传入 user对象 例: { username:admin, password:12345 }
import { login } from '../../redux/action';

/* 引入login组件的样式 */
import '../../assets/css/login.less'

/* 登录路由组件 */ 
 class Login extends Component {

    state = {
        redirectTo: false
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { username, password, remember}  = values;
                if (!/^[a-zA-Z0-9_-]{4,16}$/.test(username)){
                    message.error('用户名非法');
                    return
                }
                if (!/^[a-zA-Z0-9]{4,16}$/.test(password)){
                    message.error('密码非法');
                    return
                }
                this.handleLogin( {username, password}, remember)
            }
        });
    }

     handleLogin = async (user, remember) => {
      await this.props.login( user )
      const {msg} = this.props.user;
      if(msg) {
          message.error(msg);
      }else {
        if ( remember ) {
              localStorage.username = user.username;
              localStorage.password = user.password;
          } else {
              localStorage.username = ''
              localStorage.password = ''
          }
          this.setState({ redirectTo: true})
      }
    }

 
    

    render() {
        const { getFieldDecorator } = this.props.form;
        
        return (
            this.state.redirectTo
            ? <Redirect to = '/' />
            : <div className="login">
                <header className="login-header">
                    <img src={require('../../assets/img/logo.png')} alt=""/>
                    <h2>欢迎使用我们的后台管理系统</h2>
                </header>
                <section className="login-section">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, wit: true, message: '用户名不能为空!' },
                                    {min: 4, message:'用户名至少4位'},
                                    {max:12, message:"用户名最多12位"},
                                    { pattern:/^[a-zA-Z0-9_-]+/, message:"用户名必须是英文,数字或下划线组成"}
                                ],
                                initialValue: localStorage.username || 'admin' //用户名初始值
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
                                    { min:4, message:"密码至少4位" },
                                    { max:16, message:"密码最多16位"},
                                    { pattern:/^[a-zA-Z0-9_]+/, message:'密码必须是英文, 数字或下划线组成'}
                                    
                            ],
                                initialValue: localStorage.password || ''  // 密码初始值
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
                                <Link to="/register" style={{ marginLeft: '12px' }}>没有账户?</Link>
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
export default connect(
    state => ({user: state.user}),
    { login }
)(Form.create({ name: 'normal_login' })(Login))
