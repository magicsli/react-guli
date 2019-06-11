const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/guli')

const guli = mongoose.connection

guli.on('connected', () => {
    console.log('数据连接成功')
})

const  userSchema = mongoose.Schema({
    username: {type:String, require:true},
    password: {type:String, require:true},

})

const UserModel = mongoose.model('users', userSchema)


exports.UserModel = UserModel;
 