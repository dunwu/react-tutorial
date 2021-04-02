# Rendering a Route

首先，`React Router` 是一个组件。

```jsx
render(<Router />, document.getElementById("app"));
```

如果不配置 `Route`，什么也不会展示。

打开 index.js 并且

打开  `index.js`  并且

1. 导入  `Router`, `Route`, 和 `hashHistory`
2. 渲染一个  `Router`  来替代  `App`

```jsx
// ...
import { Router, Route, hashHistory } from "react-router";

render(
  <Router history={hashHistory}>
    <Route path="/" component={App} />
  </Router>,
  document.getElementById("app")
);
```

确认你的服务器已经使用  `npm start`  运行，然后访问  [http://localhost:8080](http://localhost:8080/)

你应该得到与之前相同的屏幕内容，但这次 URL 中存在一些垃圾我们使用 hashHistory - 它使用 URL 的哈希部分管理路由历史。它会在浏览器使用真正的网址时时产生额外的垃圾（形式如：http://127.0.0.1:8080/#/?_k=dphz4i）。以后，react-router将改为：使用真正的url后，丢弃垃圾。但目前，它还是运行良好的，因为它不需要任何服务器端配置。

## 运行步骤

1. 依次执行命令：

```
npm install
npm start
```

2. 在浏览器中打开 [http://localhost:8080](http://localhost:8080)
3. 你应该看到浏览器页面中的内容和 `01-setting-up` 相同，但是 url 栏中的地址有所不同（形式如：http://localhost:8080/#/?\_k=6mb41v）。这是因为使用了 `hashHistory` ，它使用 URL 的哈希部分来管理路由历史。
4. 访问 [http://localhost:8080/#/about](http://localhost:8080/#/about) 和 [http://localhost:8080/#/repos](http://localhost:8080/#/repos) 。可以看到 about 和 repos 页面。
