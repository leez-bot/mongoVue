const mongoose = require('mongoose')

const { Schema } = mongoose

const productSchema = new Schema({
  'title': String,
  'content': String
})

module.exports = mongoose.model('Books', productSchema, 'books')
