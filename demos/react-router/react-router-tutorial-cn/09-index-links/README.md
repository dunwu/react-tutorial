# Index Links（索引路由）

你是否注意到目前我们的app中没有任何导航可以返回 `Home` 组件。

添加一个跳转到 `/` 的链接：

```jsx
// in App.js
// ...
<li><NavLink to="/">Home</NavLink></li>
// ...
```

发现什么奇怪的地方吗？跳转到 Home 组件的链接总是活动状态。我们之前的教程中提到了，如果子路由是活动状态，它的父路由也会自动变成活动状态。而不幸的是，根目录 `/` 是所有路径的父节点。

对于这个链接，我们希望它能仅仅在索引路由是活动状态时才被同步为活动状态。有两种方法可以让React-Router知道你要链接的是索引路由。

## IndexLink

首先，使用 `IndexLink` 来替代 `NavLink` 。

```jsx
// App.js
import { IndexLink } from 'react-router'

// ...
<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
```

搞定。现在这个链接仅仅当我们在索引路由页面时才处于活动状态。

## `onlyActiveOnIndex` Property

我们可以使用 `Link` ，并通过它传递 `onlyActiveOnIndex` 属性(`IndexLink` 可以很方便的包裹着带有这个属性的 `Link` )。

```jsx
<li><Link to="/" activeClassName="active" onlyActiveOnIndex={true}>Home</Link></li>
```

好了，我们已经抽离了带有 `Nav` 的 `activeClassName` 。

记住，在 `NavLink` 中，我们通过 `{...spread}` 语法将所有属性传递给 `Link`。因为，我们实际上能够在渲染 `NavLink` 时添加属性，并将它下传给 `Link` ：

```jsx
<li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
```


