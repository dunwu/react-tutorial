# 路由索引Index Routes

当我们访问App `/` 路径时，看到的只有导航和一个空白页。

可能我们更想要一个首页组件，而不是空白页。

创建一个 Home 组件并让根路径指向这个组件：

```jsx
// modules/Home.js
import React from 'react'

export default React.createClass({
  render() {
    return <div>Home</div>
  }
})
```

一个方法是看看 App 组件是否有任何子节点，如果没有，直接渲染 Home 组件：

```jsx
// modules/App.js
import Home from './Home'

// ...
<div>
  {/* ... */}
  {this.props.children || <Home/>}
</div>
//...
```

这个方法是可行的，但是很可能我们想要的是让 Home 组件在以后链接到类似 About 和 Repos 这样的路由。

1. 参与依赖于匹配的路由及其组件的数据提取抽象。
2. 参与 `onEnter` 钩子
3. 参与代码分割

让 App 脱离 Home，并让路由配置决定什么组件作为孩子节点来渲染。记住，我们想要在小应用程序中构建小应用程序，而不是大应用程序。

在`index.js` 中添加一个新的路由。

```jsx
// index.js
// new imports:
// add `IndexRoute` to 'react-router' imports
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
// and the Home component
import Home from './modules/Home'

// ...

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>

      {/* add it here, as a child of `/` */}
      <IndexRoute component={Home}/>

      <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
```

现在打开 [http://localhost:8080](http://localhost:8080) ，看一下新的组件是如何渲染的。

注意 `IndexRoute` 是如何没有路径的。当没有其他孩子节点与父节点匹配时，它成为了父节点的`this.props.children` ，换句话说，由父路由完全匹配。

索引路由有时会扭曲人们的想法。幸运的是，大部分时候，还是很有用的。
想一想web服务器是如何寻找根路径下的index.html。同理，当一个路由路径精确匹配时，React Router会自动寻找路径下的索引路由。