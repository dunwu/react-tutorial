# Redux 常见问题

## 目录

- **综合**
  - [何时使用 Redux ？](General.md#general-when-to-use)
  - [Redux 只能搭配 React 使用？](General.md#general-only-react)
  - [Redux 需要特殊的编译工具支持吗？](General.md#general-build-tools)
- **Reducer**
  - [如何在 reducer 之间共享 state ？ combineReducers 是必须的吗？](Reducers.md#reducers-share-state)
  - [处理 action 必须用 switch 语句吗？](Reducers.md#reducers-use-switch)
- **组织 State**
  - [必须将所有 state 都维护在 Redux 中吗？ 可以用 React 的 setState() 方法吗？](OrganizingState.md#organizing-state-only-redux-state)
  - [可以将 store 的 state 设置为函数、promise或者其它非序列化值吗？](OrganizingState.md#organizing-state-non-serializable)
  - [如何在 state 中组织嵌套及重复数据？](OrganizingState.md#organizing-state-nested-data)
- **创建 Store**
  - [可以创建多个 store 吗，应该这么做吗？能在组件中直接引用 store 并使用吗？](StoreSetup.md#store-setup-multiple-stores)
  - [在 store enhancer 中可以存在多个 middleware 链吗？ 在 middleware 方法中，next 和 dispatch 之间区别是什么？](StoreSetup.md#store-setup-middleware-chains)
  - [怎样只订阅 state 的一部分变更？如何将分发的 action 作为订阅的一部分？](StoreSetup.md#store-setup-subscriptions)
- **Action**
  - [为何 type 必须是字符串，或者至少可以被序列化？ 为什么 action 类型应该作为常量？](Actions.md#actions-string-constants)
  - [是否存在 reducer 和 action 之间的一对一映射？](Actions.md#actions-reducer-mappings)
  - [怎样表示类似 AJAX 请求的 “副作用”？为何需要 “action 创建函数”、“thunks” 以及 “middleware” 类似的东西去处理异步行为？](Actions.md#actions-side-effects)
  - [是否应该在 action 创建函数中连续分发多个 action？](Actions.md#actions-multiple-actions)
- **代码结构**  
  - [文件结构应该是什么样？项目中该如何对 action 创建函数和 reducer 分组？ selector 又该放在哪里？](CodeStructure.md#structure-file-structure)
  - [如何将逻辑在 reducer 和 action 创建函数之间划分？ “业务逻辑” 应该放在哪里？](CodeStructure.md#structure-business-logic)
- **性能**
  - [考虑到性能和架构， Redux “可扩展性” 如何？](Performance.md#performance-scaling)
  - [每个 action 都调用 “所有的 reducer” 会不会很慢？](Performance.md#performance-all-reducers)
  - [在 reducer 中必须对 state 进行深拷贝吗？拷贝 state 不会很慢吗？](Performance.md#performance-clone-state)
  - [怎样减少 store 更新事件的数量？](Performance.md#performance-update-events)
  - [仅有 “一个 state 树” 会引发内存问题吗？分发多个 action 会占用内存空间吗？](Performance.md#performance-state-memory)
- **React Redux**
  - [为何组件没有被重新渲染、或者 mapStateToProps 没有运行？](ReactRedux.md#react-not-rerendering)
  - [为何组件频繁的重新渲染？](ReactRedux.md#react-rendering-too-often)
  - [怎样使 mapStateToProps 执行更快？](ReactRedux.md#react-mapstate-speed)
  - [为何不在被连接的组件中使用 this.props.dispatch ？](ReactRedux.md#react-props-dispatch)
  - [应该只连接到顶层组件吗，或者可以在组件树中连接到不同组件吗？](ReactRedux.md#react-multiple-components)