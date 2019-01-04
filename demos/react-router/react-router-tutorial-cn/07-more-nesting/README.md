# 更多嵌套

首先，嵌套 `Repo` 到 `Repos` 下。然后，渲染 `Repos` 下的 `this.props.children`  。

```jsx
// index.js
// ...
<Route path="/repos" component={Repos}>
  <Route path="/repos/:userName/:repoName" component={Repo}/>
</Route>
```

```jsx
// Repos.js
// ...
<div>
  <h2>Repos</h2>
  <ul>
    <li><Link to="/repos/reactjs/react-router">React Router</Link></li>
    <li><Link to="/repos/facebook/react">React</Link></li>
  </ul>
  {/* will render `Repo.js` when at /repos/:userName/:repoName */}
  {this.props.children}
</div>
```

## Active Links

引入  `NavLink` ，将活动类名添加进去：

```jsx
// modules/Repos.js
// import it
import NavLink from './NavLink'

// ...
<li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
<li><NavLink to="/repos/facebook/react">React</NavLink></li>
// ...
```

注意到 `/repos` 链接顶部和单个 repo 链接都是活动的吗？当孩子路由是活动的状态时，它们的父节点也是同样状态。