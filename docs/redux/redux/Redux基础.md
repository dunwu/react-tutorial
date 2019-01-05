# Redux 基础

## Action

**Action** 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的**唯一**来源。一般来说你会通过[`store.dispatch()`](http://cn.redux.js.org/docs/api/Store.html#dispatch) 将 action 传到 store。

添加新 todo 任务的 action 是这样的：

```
const ADD_TODO = 'ADD_TODO'

```

```
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}

```

Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 `type` 字段来表示将要执行的动作。多数情况下，`type` 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。

```
import { ADD_TODO, REMOVE_TODO } from '../actionTypes'
```

**我们应该尽量减少在 action 中传递的数据**。

### Action 创建函数

**Action 创建函数** 就是生成 action 的方法。“action” 和 “action 创建函数” 这两个概念很容易混在一起，使用时最好注意区分。

在 Redux 中的 action 创建函数只是简单的返回一个 action:

```
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

```

这样做将使 action 创建函数更容易被移植和测试。

## Reducer

reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。

```jsx
(oldState, action) => newState
```

保持 reducer 纯净非常重要。**永远不要**在 reducer 里做这些操作：

- 修改传入参数；
- 执行有副作用的操作，如 API 请求和路由跳转；
- 调用非纯函数，如 `Date.now()` 或 `Math.random()`。

**只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。**

## Store

**Store** 就是把它们联系到一起的对象。Store 有以下职责：

- 维持应用的 state；
- 提供 [`getState()`](http://cn.redux.js.org/docs/api/Store.html#getState) 方法获取 state；
- 提供 [`dispatch(action)`](http://cn.redux.js.org/docs/api/Store.html#dispatch) 方法更新 state；
- 通过 [`subscribe(listener)`](http://cn.redux.js.org/docs/api/Store.html#subscribe) 注册监听器;
- 通过 [`subscribe(listener)`](http://cn.redux.js.org/docs/api/Store.html#subscribe) 返回的函数注销监听器。

再次强调一下 **Redux 应用只有一个单一的 store**。当需要拆分数据处理逻辑时，你应该使用 [reducer 组合](http://cn.redux.js.org/docs/basics/Reducers.html#splitting-reducers) 而不是创建多个 store。

## 数据流

**严格的单向数据流**是 Redux 架构的设计核心。

Redux 应用中数据的生命周期遵循下面 4 个步骤：

1. **调用** [`store.dispatch(action)`](http://cn.redux.js.org/docs/api/Store.html#dispatch)。

   [Action](http://cn.redux.js.org/docs/basics/Actions.html) 就是一个描述“发生了什么”的普通对象。比如：

   ```
    { type: 'LIKE_ARTICLE', articleId: 42 };
    { type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } };
    { type: 'ADD_TODO', text: 'Read the Redux docs.'};

   ```

   可以把 action 理解成新闻的摘要。如 “玛丽喜欢42号文章。” 或者 “任务列表里添加了'学习 Redux 文档'”。

   你可以在任何地方调用 [`store.dispatch(action)`](http://cn.redux.js.org/docs/api/Store.html#dispatch)，包括组件中、XHR 回调中、甚至定时器中。

2. **Redux store 调用传入的 reducer 函数。**

   [Store](http://cn.redux.js.org/docs/basics/Store.html) 会把两个参数传入 [reducer](http://cn.redux.js.org/docs/basics/Reducers.html)： 当前的 state 树和 action。例如，在这个 todo 应用中，根 reducer 可能接收这样的数据：

   ```jsx
    // 当前应用的 state（todos 列表和选中的过滤器）
    let oldState = {
      visibleTodoFilter: 'SHOW_ALL',
      todos: [
        {
          text: 'Read the docs.',
          complete: false
        }
      ]
    }

    // 将要执行的 action（添加一个 todo）
    let action = {
      type: 'ADD_TODO',
      text: 'Understand the flow.'
    }

    // reducer 返回处理后的应用状态
    let nextState = todoApp(oldState, action);
   ```

   注意 reducer 是纯函数。它仅仅用于计算下一个 state。它应该是完全可预测的：多次传入相同的输入必须产生相同的输出。它不应做有副作用的操作，如 API 调用或路由跳转。这些应该在 dispatch action 前发生。

3. **根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。**

   根 reducer 的结构完全由你决定。Redux 原生提供[`combineReducers()`](http://cn.redux.js.org/docs/api/combineReducers.html)辅助函数，来把根 reducer 拆分成多个函数，用于分别处理 state 树的一个分支。

   下面演示 [`combineReducers()`](http://cn.redux.js.org/docs/api/combineReducers.html) 如何使用。假如你有两个 reducer：一个是 todo 列表，另一个是当前选择的过滤器设置：

   ```jsx
    function todos(state = [], action) {
      // 省略处理逻辑...
      return nextState;
    }

    function visibleTodoFilter(state = 'SHOW_ALL', action) {
      // 省略处理逻辑...
      return nextState;
    }

    let todoApp = combineReducers({
      todos,
      visibleTodoFilter
    })
   ```

   当你触发 action 后，`combineReducers` 返回的 `todoApp` 会负责调用两个 reducer：

   ```
    let nextTodos = todos(state.todos, action);
    let nextVisibleTodoFilter = visibleTodoFilter(state.visibleTodoFilter, action);

   ```

   然后会把两个结果集合并成一个 state 树：

   ```
    return {
      todos: nextTodos,
      visibleTodoFilter: nextVisibleTodoFilter
    };

   ```

   虽然 [`combineReducers()`](http://cn.redux.js.org/docs/api/combineReducers.html) 是一个很方便的辅助工具，你也可以选择不用；你可以自行实现自己的根 reducer！

4. **Redux store 保存了根 reducer 返回的完整 state 树。**

   这个新的树就是应用的下一个 state！所有订阅 [`store.subscribe(listener)`](http://cn.redux.js.org/docs/api/Store.html#subscribe) 的监听器都将被调用；监听器里可以调用 [`store.getState()`](http://cn.redux.js.org/docs/api/Store.html#getState) 获得当前 state。

   现在，可以应用新的 state 来更新 UI。如果你使用了 [React Redux](https://github.com/gaearon/react-redux) 这类的绑定库，这时就应该调用`component.setState(newState)` 来更新。