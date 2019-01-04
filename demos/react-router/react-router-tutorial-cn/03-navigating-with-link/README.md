# Navigating with Link(使用链接导航)

也许在您应用中最常用的组件是 `Link`。它几乎与您惯用的 `<a/>` 标记完全相同，除了它知道被它渲染的 `Router`。

让我们为我们的 App 组件创建几个导航。

修改 `modules/App.js` 文件如下：

```jsx
// modules/App.js
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/repos">Repos</Link></li>
        </ul>
      </div>
    )
  }
})
```

现在访问 [http://localhost:8080](http://localhost:8080) ，并点击超链接，应该可以跳转到制定页面了。
