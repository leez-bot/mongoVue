const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Users = require('../models/users')

// 连接数据库
// mongoose.connect('mongodb://127.0.0.1:27017/test_db') // 连接本地mongo数据库
mongoose.connect('mongodb+srv://mongoDB Altas账号:mongoDB Altas密码@testdb-h9w57.mongodb.net/testDB') // 连接mongoDB Altas数据库

mongoose.connection.on('connected', () => {
  console.log('mongoDB数据库连接成功')
})
mongoose.connection.on('error', () => {
  console.log('mongoDB数据库连接失败')
})
mongoose.connection.on('disconnected', () => {
  console.log('mongoDB数据库断开连接')
})

const handleCallback = (res, err, doc = {}) => {
  if (err) {
    res.json({
      status: '1',
      msg: err.message
    })
  }
  res.json({
    status: '0',
    msg: '',
    result: {
      count: doc.length,
      list: doc
    }
  })
}

router.get('/', (req, res, next) => {
  // res.send('拿到了商品列表数据了')
  // 查询数据库
  // const param = req.params()
  const { page, pageSize, sort } = req.query // 查询条件
  // console.log(req.query)
  const skip = (Number(page) - 1) * Number(pageSize) // 需要跳过的条数
  // 先查询所有，再跳过前面页码所有数据，只查找当前页码，并limit限制条数
  const userModel = Users.find({
    // 限定条件，年龄大于0 ，小于等于100
    age: {
      $gt: 0,
      $lte: 100
    }
  }).skip(skip).limit(Number(pageSize))
  userModel.sort({ 'age': Number(sort) })
  // 条件查询
  userModel.exec((err, doc) => {
    handleCallback(res, err, doc)
  })
  // 以下是普通查询
  // Users.find({}, (err, doc) => {
  //   handleCallback(res, err, doc)
  // })
})

// 添加用户
router.post('/addUser', (req, res, next) => {
  const _user = req.body
  // console.log(_user)
  const user = new Users(_user)
  user.save((err) => {
    handleCallback(res, err)
  })
})

// 删除用户
router.post('/deleteUser', (req, res, next) => {
  console.log(req.body)
  Users.remove({
    _id: req.body.id
  }, err => {
    handleCallback(res, err)
  })
})

module.exports = router
