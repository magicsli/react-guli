var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5')
const {UserModel} = require('../db/module') 

/* filter */
const filter = { password: 0, __v: 0 }

// 登录
router.post('/login', function(req, res, next){
  const { username, password } = req.body;
  UserModel.findOne( {username, password: md5(password)}, filter, (err, user)=> {
    err && res.send({code:1, msg:'连接错误, 请重新登录或通知管理员'});
    if(user) {
      res.cookie('userid', user._id, {maxAge: 1000*60*60*7});
      res.send({code:0, data:user})
    }else{
      res.send({code:1, msg:"用户名或密码不正确"})
    }
  })
})

// 注册
router.post('/register', function(req, res, next){
  const {username, password} = req.body;
  UserModel.findOne({username}, (err, user)=>{
    if( user ) {
      res.send({code:1, msg:'此用户名已存在'});
    }else{
      new UserModel({ username, password:md5(password) }).save( (err, user) => {
        if (err) {
           res.send({ code: 1, msg: '数据库错误, 请通知管理员' });
           return
          }
        res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 7 });
        const data = { username, _id: user._id }
        res.send({code:0, data})
      } )
    }
  })
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
