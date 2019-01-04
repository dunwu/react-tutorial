# Navigating Programatically

尽管大部分导航是以 `Link` 形式出现，但是你也可以用编程方式来实现导航，如回应表单提交，点击按钮等。

让我们在 `Repos` 中写一个具有编程式导航作用的小表单。

```jsx
// modules/Repos.js
import React from 'react'
import NavLink from './NavLink'

export default React.createClass({

  // add this method
  handleSubmit(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value
    const repo = event.target.elements[1].value
    const path = `/repos/${userName}/${repo}`
    console.log(path)
  },

  render() {
    return (
      <div>
        <h2>Repos</h2>
        <ul>
          <li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
          <li><NavLink to="/repos/facebook/react">React</NavLink></li>
          {/* add this form */}
          <li>
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="userName"/> / {' '}
              <input type="text" placeholder="repo"/>{' '}
              <button type="submit">Go</button>
            </form>
          </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
```

你可以用两种方法来实现，第一种比第二种简单。

首选，我们将 `browserHistory` 单例传给 `index.js` 中的 `Router` 并将新的 URL push 到 history。

```jsx
// modules/Repos.js
import { browserHistory } from 'react-router'

// ...
  handleSubmit(event) {
    // ...
    const path = `/repos/${userName}/${repo}`
    browserHistory.push(path)
  },
// ...
```

然而，这里有一个潜在的问题。如果你传递给 `Router` 的 history 不是之前使用的实例，就不起作用。使用 `browserHistory` 之外的其它对象并不常见，所以这是可接受的实践。如果你关注 history，可以创建一个模块来 exports 你想要在整个app中使用的history。

你也可以使用 Router 提供的属性 `context.router` 。

首先，你需要通过组件得到 `context` ，然后你就可以使用了：

```jsx
export default React.createClass({

  // ask for `router` from context
  contextTypes: {
    router: React.PropTypes.object
  },

  // ...

  handleSubmit(event) {
    // ...
    this.context.router.push(path)
  },

  // ..
})
```

使用这种方法，你需要确保无论任何 history 记录都要传递给 `Router`。这种方式使测试更加简单，因为你更容易保存上下文而不是单例。