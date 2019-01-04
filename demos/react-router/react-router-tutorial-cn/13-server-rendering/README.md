# 服务器渲染

首先，服务器渲染是 React 的一个既简单又核心的概念。

```js
render(<App/>, domNode)
// can be rendered on the server as
const markup = renderToString(<App/>)
```

它既不是阳春白雪，也不是下里巴人。首先，我们要把一堆 webpack 配置抛给你，不做太多解释，然后我们再讨论 Router 。

因为 node 并不识别 JSX 语义，所以我们需要用某种方式来编译代码。使用类似 `babel/register` 这样的库并不适合生产环境，所以我们将使用 webpack 构建一个服务器包，就像我们使用它来构建一个客户端包。


创建一个新文件 `webpack.server.config.js` ，内容如下：
there:

```js
var fs = require('fs')
var path = require('path')

module.exports = {

  entry: path.resolve(__dirname, 'server.js'),

  output: {
    filename: 'server.bundle.js'
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),

  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }

}
```

幸运的是，部分配置参数的作用很明显，我们不会对所有属性都一一解释。现在，我们可以通过 webpack 来运行我们的 `server.js` 文件了。

现在，在运行我们的app前，需要先定义一些脚本命令来构建服务器 bundle。

更新 `package.json` 的 `scripts` 属性如下：

```
"scripts": {
  "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
  "start:dev": "webpack-dev-server --inline --content-base public/ --history-api-fallback",
  "start:prod": "npm run build && node server.bundle.js",
  "build:client": "webpack",
  "build:server": "webpack --config webpack.server.config.js",
  "build": "npm run build:client && npm run build:server"
},
```

现在，当我们运行 `NODE_ENV=production npm start` 时，webpack会为客户端和服务端都创建 bundle。

ok，我们来讨论一下Router。我们需要将我们的路由分离成一个模块，这样客户端和服务端的入口都可以复用它。在  `modules/routes`  创建一个文件，将路由和组件移入到这里。

```js
// modules/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import About from './About'
import Repos from './Repos'
import Repo from './Repo'
import Home from './Home'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/repos" component={Repos}>
      <Route path="/repos/:userName/:repoName" component={Repo}/>
    </Route>
    <Route path="/about" component={About}/>
  </Route>
)
```

```js
// index.js
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
// import routes and pass them into <Router/>
import routes from './modules/routes'

render(
  <Router routes={routes} history={browserHistory}/>,
  document.getElementById('app')
)
```

打开 `server.js` 。我们引用React Router中的两个模块，来帮助我们渲染服务器。

如果我们师徒在服务器上渲染一个  `<Router/>`  ，就像我们在客户端上做的一样，我们会得到一个空屏幕，因为服务器渲染是同步的，路由匹配是异步的。

此外，大多数应用程序要使用路由器来帮助他们加载数据。因此无论路由是不是异步，你会想在渲染之前知道屏幕上将呈现什么，这样你就可以在渲染之前使用这些信息来加载异步数据。我们在app中没有任何数据加载，但是你会看到将要发生什么。

首先，我们从 react-router 中导入 `match` 和 `RouterContext` ，然后我们将路由与url进行匹配，最后渲染它们。

```js
// ...
// import some new stuff
import React from 'react'
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server'
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router'
import routes from './modules/routes'

// ...

// send all requests to index.html so browserHistory works

app.get('*', (req, res) => {
  // match the routes to the url
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // `RouterContext` is what the `Router` renders. `Router` keeps these
    // `props` in its state as it listens to `browserHistory`. But on the
    // server our app is stateless, so we need to use `match` to
    // get these props before rendering.
    const appHtml = renderToString(<RouterContext {...props}/>)

    // dump the HTML into a template, lots of ways to do this, but none are
    // really influenced by React Router, so we're just using a little
    // function, `renderPage`
    res.send(renderPage(appHtml))
  })
})

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
}

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
```

成了。如果你现在运行 `NODE_ENV=production npm start` 并访问app，你可以看到source文件并看到服务器将我们的app发到了浏览器上。当你点击时，你可以发现客户端已经接管并且不向服务器发出UI的请求。很酷吧？

我们的匹配回调有点幼稚，下面是一个生产环境的版本：

```js
app.get('*', (req, res) => {
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // in here we can make some decisions all at once
    if (err) {
      // there was an error somewhere during route matching
      res.status(500).send(err.message)
    } else if (redirect) {
      // we haven't talked about `onEnter` hooks on routes, but before a
      // route is entered, it can redirect. Here we handle on the server.
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      // if we got props then we matched a route and can render
      const appHtml = renderToString(<RouterContext {...props}/>)
      res.send(renderPage(appHtml))
    } else {
      // no errors, no redirect, we just didn't match anything
      res.status(404).send('Not Found')
    }
  })
})
```

服务器渲染技术还很新颖。现在还没有最佳实践，特别是遇到数据加载时。
