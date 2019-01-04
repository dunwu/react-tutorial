# Nested Routes

我们添加到应用程序的导航应该可能存在于每个屏幕上。没有React Router，我们可以将ul包装到一个组件中，例如 Nav，并在我们的每个屏幕上渲染一个 Nav。

这种方法不像应用程序增长那么干净。
`React Router`提供了另一种方式来与嵌套路由共享UI，这是从[Ember]（http://emberjs.com）（/ me tips hat）学到的一个伎俩。

## Nested UI and Nested URLs

你注意到你的 App 就像是一组层层包装的盒子吗？你是否也注意到你的 URL 也是有层级的呢？举一个url 例子， `/repos/123` ，我们的组件可能是像这样的：

```js
<App>       {/*  /          */}
  <Repos>   {/*  /repos     */}
    <Repo/> {/*  /repos/123 */}
  </Repos>
</App>
```

而我们的 UI 可能是这样的：

```
         +-------------------------------------+
         | Home Repos About                    | <- App
         +------+------------------------------+
         |      |                              |
Repos -> | repo |  Repo 1                      |
         |      |                              |
         | repo |  Boxes inside boxes          |
         |      |  inside boxes ...            | <- Repo
         | repo |                              |
         |      |                              |
         | repo |                              |
         |      |                              |
         +------+------------------------------+
```

React Router 通过嵌套路由，让你的 UI 自动成为嵌套的UI。

## 分享我们的导航

让我们把 About 和 Repos 组件嵌套进 App 中，这样，我们就可以在任意地方复用 App 这个导航组件了。我们需要做两步：

首先，为 App 创建子节点，并将隶属于它的 Route 移过来。

```jsx
// index.js
// ...
render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/* make them children of `App` */}
      <Route path="/repos" component={Repos}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
```

接下来，渲染 App 内部的子节点。

```jsx
// modules/App.js
// ...
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/repos">Repos</Link></li>
        </ul>

        {/* add this */}
        {this.props.children}

      </div>
    )
  }
// ...
```

好了，现在尝试点击链接，然后留意 App 组件，可以发现子路由组件现在被 `this.props.children` 所包裹。

由 React Router 构建的 UI 就像这样：

```js
// at /about
<App>
  <About/>
</App>

// at /repos
<App>
  <Repos/>
</App>
```

## 路由与分治

构建大家伙的最好方法是将小的事物拼在一起。

这就是“分治”思想。同时也是 React Router 的真正强大之处。所有的 Route 可以被作为独立应用去开发。你的路由配置可以按照你的需要随意组合。应用就像是大盒子中包含着多个小盒子，小盒子中又包含着更小的盒子。