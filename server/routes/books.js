const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')
const Books = require('../models/books')

// mongoose.connect('mongodb+srv://lizheng:lizheng1255@testdb-h9w57.mongodb.net/testDB') // 连接mongoDB Altas数据库

// mongoose.connection.on('connected', () => {
//   console.log('mongoDB数据库连接成功')
// })
// mongoose.connection.on('error', () => {
//   console.log('mongoDB数据库连接失败')
// })
// mongoose.connection.on('disconnected', () => {
//   console.log('mongoDB数据库断开连接')
// })

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
  const { page = 1, pageSize = 10 } = req.query // 查询条件
  // console.log(req.query)
  const skip = (Number(page) - 1) * Number(pageSize) // 需要跳过的条数
  // 先查询所有，再跳过前面页码所有数据，只查找当前页码，并limit限制条数
  const BooksModel = Books.find().skip(skip).limit(Number(pageSize))
  // 条件查询
  BooksModel.exec((err, doc) => {
    handleCallback(res, err, doc)
  })
  // 以下是普通查询
  // Users.find({}, (err, doc) => {
  //   handleCallback(res, err, doc)
  // })
})

module.exports = router
