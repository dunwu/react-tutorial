# 生产环境服务器

本节内容与 React Router 没有任何关系，但是由于我们讨论的是 Web 服务器，这可能会更接近真实世界的项目。服务器的渲染在下一节进行讨论。

webpack dev server 不是生产服务器。让我们制作一个生产服务器和一个环境感知的脚本，根据环境启动正确的服务器。

让我们先安装几个模块：

```sh
npm install express if-env compression --save
```

首先，我们在 `package.json` 总使用 `if-env`  。像下面这样更新 `package.json` 中的 `entry` 属性：

```json
// package.json
"scripts": {
  "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
  "start:dev": "webpack-dev-server --inline --content-base . --history-api-fallback",
  "start:prod": "webpack && node server.js"
},
```

打开 `webpack.config.js` 并添加 `publicPath` 属性，值为 '/' ，这表示所有路径。

```javascript
// webpack.config.js
  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: '/'
  },
```

现在，当你执行 `npm start` 时，脚本会先去检查环境变量 `NODE_ENV` 的值。如果值为 `production` ，表示是生产环境，运行 `npm run start:prod` ；否则，运行 `npm run start:dev` 。

现在我们准备使用 Express（node.js 的一个流行 web 框架） 创建一个生产服务器，并在根目录中添加一个新文件。第一次尝试：

```js
// server.js
var express = require('express')
var path = require('path')

var app = express()

// serve our static stuff like index.css
app.use(express.static(__dirname))

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
```

现在，执行命令：

```sh
NODE_ENV=production npm start
# For Windows users:
# SET "NODE_ENV=production" && npm start
```

恭喜！你现在已经有了 app 的生产服务器。单击后，尝试导航到 [http://localhost:8080/package.json](http://localhost:8080/package.json) 。

糟糕。让我们修复这个问题。我们将更新文件在app中的存放路径。

1. 创建一个 `public` 目录。
2. 将 `index.html` 和 `index.css` 移入 `public` 目录。

现在，让我们更新 `server.js` 来指定静态资源正确的存放目录：

```js
// server.js
// ...
// add path.join here
app.use(express.static(path.join(__dirname, 'public')))

// ...
app.get('*', function (req, res) {
  // and drop 'public' in the middle of here
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
```

我们也需要告诉  webpack 新的构建路径：

```js
// webpack.config.js
// ...
output: {
  path: 'public',
  // ...
}
```

最后，在脚本中的 `npm run start:dev` 命令后面添加  `--content-base` 属性：

```json
"start:dev": "webpack-dev-server --inline --content-base public --history-api-fallback",
```

更好的做法是：在 JavaScript 文件中使用 `WebpackDevServer` API，而不是在npm脚本中使用CLI，然后将此路径转换为在所有这些文件中共享的配置。这里，限于时间和篇幅，不再进一步讨论。

现在，我们已经不把项目的根作为公共文件，让我们添加一些代码让 webpack 压缩并打包给 express。

```js
// webpack.config.js

// make sure to import this
var webpack = require('webpack')

module.exports = {
  // ...

  // add this handful of plugins that optimize the build
  // when we're in production
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [],

  // ...
}
```

或者在express中快速压缩：

```js
// server.js
// ...
var compression = require('compression')

var app = express()
// must be first!
app.use(compression())
```

现在以生产环境方式启动服务器：

```sh
NODE_ENV=production npm start
```

你可以看到 UglifyJS 的日志出现在浏览器中，你还可以看到静态资源已经成了 gzip 压缩包的形式。