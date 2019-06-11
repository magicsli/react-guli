import ajax from './ajax'

// 登录接口     参数示例: user = { username: 'admin', password: 1234 }
export const reqLogin = user =>  ajax('/login', user, 'post')

// 自动登录接口     参数示例: _id = 123165456465
export const reqAutoLogin = _id => ajax('/auto', { _id }, 'post') 

// 添加用户
export const reqAddUser = user => ajax('/register', user, 'post')