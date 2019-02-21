var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var ejs = require('ejs')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var goodsRouter = require('./routes/goods')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))

// 设置页面渲染引擎，默认为jade模板，如果需要使用html模板，需要安装ejs模块
app.engine('.html', ejs.__express)
app.set('view engine', 'html')
// app.set('view engine', 'jade');

// 启用本地文件访问
// var options = {
//   dotfiles: 'ignore',
//   etag: false,
//   extensions: ['htm', 'html'],
//   index: false,
//   maxAge: '1d',
//   redirect: false,
//   setHeaders: function (res, path, stat) {
//     res.set('x-timestamp', Date.now())
//   }
// }

// app.use(express.static('public', options))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/goods', goodsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
