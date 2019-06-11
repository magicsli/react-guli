import React, { Component } from 'react'
import { BrowserRouter, Route, Switch} from "react-router-dom"

import { notification, Icon} from 'antd'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import Register from './pages/register/register'


export default class App extends Component {
    componentDidMount() {
        setTimeout(() => {
            notification.open({
                message: '致谢',
                description:
                    '感谢您测试我的react后台管理系统, 此系统目前处于测试阶段, 我的githubID: magicsli',
                icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
            });
        }, 600);

    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/" component={Admin} />
                </Switch>
            </BrowserRouter>
        )
    }
}
