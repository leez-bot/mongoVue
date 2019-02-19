const mongoose = require('mongoose') // mongoose是用来连接操作mongoDB的一个工具
const { Schema } = mongoose

const produtSchema = new Schema({
  'name': String,
  'age': Number
})

// module.exports = mongoose.model('Users', produtSchema)
// 如果没有第三个参数，会默认去数据库查询users这个集合。如果第一个参数不带s，默认会带一个s。如果指定了第三个参数，会直接查询指定的集合
module.exports = mongoose.model('Users', produtSchema, 'users')
