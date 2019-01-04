# Clean URLs with Browser History

我们的 APP 现在是基于 hash 构建的。这种方式是默认的，因为它总能正常工作，但是还有更好的方法。

现代浏览器让JavaSvript可以在不发送HTTP请求的情况下操控URL，因此我们不需要依靠 hash (`#`) 来做路由，但是有一个catch（后面会做介绍）

## Configuring Browser History

打开 `index.js` 并用 `browserHistory` 替代 `hashHistory` 。

```jsx
// index.js
// ...
// bring in `browserHistory` instead of `hashHistory`
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

render((
  <Router history={browserHistory}>
    {/* ... */}
  </Router>
), document.getElementById('app'))
```

## Configuring Your Server

你的服务器无论引入什么URL都需要提交你的app，因为你的 app 在浏览器中是通过URL来操控。我们当前的服务器不知道如何处理这个URL。

webpack-dev-server 有个方法来解决这个问题。在 `package.json` 中修改 `scripts` 中的 `start` 脚本参数：

```json
"start": "webpack-dev-server --inline --content-base . --history-api-fallback"
```

同时，我们还需要将相对路径修改为 `index.html` 中的绝对路径。因为这些 URL将位于深层路径。如果路由在深层路径中启动，将无法找到这些文件。

```html
<!-- index.html -->
<!-- index.css -> /index.css -->
<link rel="stylesheet" href="/index.css">

<!-- bundle.js -> /bundle.js -->
<script src="/bundle.js"></script>
```

如果你的服务器正运行，先将它停掉，然后 `npm start` 。