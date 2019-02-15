# 使用说明

## 依赖安装
```
npm install(注意:本项目目录包含服务端代码,在server目录下.该目录下依赖可以单独安装,也可以将package.json和最外层合并一起安装)
```

## 启用服务器
```
推荐先全局安装pm2,然后使用pm2进行项目启动,可以同时启动服务端和客户端.使用pm2 start server/bin/www命令或者node server/bin/www启动服务端
```

## 客户端启动
```
npm run serve
```

## 校验代码规范并自动修复
```
npm run lint
```

### 其他说明
```
1: 服务端使用了express generator初始化项目,并使用mongoose连接和操作数据库,相关使用方式请自行查阅;
2: 数据库使用的mongo官方的免费数据库mongo Altas,相关使用方式请自行百度;
3: 数据库的操作方式可以在本地使用mongo shell操作,也可以自行在页面上扩展,具体操作指令请查询mongoose官方文档;
4: 使用了vue-cli3初始化项目,和vue-cli2差距略大.接口代理需要自行新建vue.config.js并编写.
```