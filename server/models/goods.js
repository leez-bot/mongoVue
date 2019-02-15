const mongoose = require('mongoose') // mongoose是用来连接操作mongoDB的一个工具
const { Schema } = mongoose

const produtSchema = new Schema({
  "productId": String,
  "productName": String,
  "salePrice": Number,
  "productImage": String,
})

module.exports = mongoose.model('Goods', produtSchema)