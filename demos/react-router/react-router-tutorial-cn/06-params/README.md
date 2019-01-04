# URL Params

考虑一下下面的 URL：

```
/repos/reactjs/react-router
/repos/facebook/react
```

这些 URL 可能匹配这样的路由路径：

```
/repos/:userName/:repoName
```

以 `:` 开始的部分是 URL 参数，这些参数的值将被解析出来并用于 `this.props.params[name]` 上的路由组件。

## 添加带参数的 Route

Let's teach our app how to render screens at `/repos/:userName/:repoName`.

首先，我们需要一个在路由上渲染的组件，创建一个新文件 `modules/Repo.js` ，内容如下：

```js
// modules/Repo.js
import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <h2>{this.props.params.repoName}</h2>
      </div>
    )
  }
})
```

现在打开 `index.js` 并添加新路由：

```js
// ...
// import Repo
import Repo from './modules/Repo'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/repos" component={Repos}/>
      {/* add the new route */}
      <Route path="/repos/:userName/:repoName" component={Repo}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
```

现在，添加 `Link` 到 `Repos.js` 中的新路由

```js
// Repos.js
import { Link } from 'react-router'
// ...
export default React.createClass({
  render() {
    return (
      <div>
        <h2>Repos</h2>

        {/* add some links */}
        <ul>
          <li><Link to="/repos/reactjs/react-router">React Router</Link></li>
          <li><Link to="/repos/facebook/react">React</Link></li>
        </ul>

      </div>
    )
  }
})
```

现在去测试你的链接。注意在路由路径上的参数名变成了组件的属性名。 `repoName` 和
`userName` 在你组件上的 `this.props.params` 都有效。你可能需要添加一些属性类型以帮助别人和你自己退出。