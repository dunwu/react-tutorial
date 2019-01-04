# 活动的超链接

`<Link>` 与 `<a>` 有一点不同：`Link` 知道它所链接到的路径是否是活动的，因此可以使用不同的样式展示。

## activeStyle

为 `Link` 添加 `activeStyle` 属性：

```js
// modules/App.js
<li><Link to="/about" activeStyle={{ color: 'red' }}>About</Link></li>
<li><Link to="/repos" activeStyle={{ color: 'red' }}>Repos</Link></li>
```

现在，如果你激活超链接，指定的链接会变为红色。

## activeClassName

你也可以使用 activeClassName 属性指明类名，然后设置类的样式。

```js
// modules/App.js
<li><Link to="/about" activeClassName="active">About</Link></li>
<li><Link to="/repos" activeClassName="active">Repos</Link></li>
```

在 index.html 文件中添加关联的 css 文件。

```html
// index.html
<link rel="stylesheet" href="index.css" />
```

添加 index.css 文件

```css
.active {
  color: green;
}
```

刷新浏览器，可以看到修改。

## NavLink

您网站中的大多数链接不需要知道它们是活动的，通常只是主导航链接需要知道。
所以有必要包装activeClassName 或 activeStyle，这样你就不必到处注明。

我们将在这里使用一个扩展运算符(...)。它克隆我们的props，在这个用例中，它将 `activeClassName` 克隆到我们所需的组件。

新建 `modules/NavLink.js` 文件，内容如下：

```js
// modules/NavLink.js
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return <Link {...this.props} activeClassName="active"/>
  }
})
```

现在将 `Link` 标签改为 `NavLink` 。

```js
// modules/App.js
import NavLink from './NavLink'

// ...

<li><NavLink to="/about">About</NavLink></li>
<li><NavLink to="/repos">Repos</NavLink></li>
```
