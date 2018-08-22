《React设计模式与最佳实践》读书笔记
# 第1章 React基础
## 1.1 声明式编程
React 使用 __声明式__ 编程方式。
声明式编程和命令式编程有什么区别呢？
命令式编程描述代码如何工作，声明式则表明要实现什么目的。与命令式世界相似的一个真实示例就是去酒吧喝酒对服务的做出以下指示（估计原作者喜欢喝喝啤酒啥的）：
* 从架子上拿一个玻璃杯；
* 将杯子放到酒桶前；
* 按下酒桶开关，倒满酒；
* 把杯子递给我。
对于声明式世界，你只需要说："请给我一杯啤酒"。
对于声明式编程方法，我们无需列出实现效果所有过程，只需要描述想要实现什么目的。

## 1.2 React元素
React使用 __元素__ 来控制UI，它描述了屏幕上需要显示的内容。
一个元素示例：
```javascript
{
  type: Title,
  props: {
    color: 'red',
    children: 'Hello, Title'
  }
}
```
type是最重要的属性，它告诉React如何处理元素本身。type属性是字符串，那么元素表示 __DOM节点__ ；如果type属性是函数，那么元素就是 __组件__ 。
children是可选的，表示元素的直接后代。
DOM元素和组件可以相互嵌套，以表示整个渲染树：
```javascript
{
  type: Title,
  props: {
    color: 'red',
    children: {
      type: 'h1',
      props: {
        children: 'Hello, H1'
      }
    }
  }
}
```


# 第2章 整理代码
## 2.1 JSX
React提供两种定义元素的方式：使用JavaScript函数，一种是使用JSX语法。
对于熟悉HTML的人，使用JSX会觉得它很方便，它让嵌套元素树的表示变得非常简单。
要使用JSX和ES6，需要安装 __Babel__ ，它能将ES6+代码编译成ES5的，也可以将JSX编译成JavaScript函数。

### 2.1.6 JSX与HTML的区别
* 属性
JavaScript的保留字需要使用其他属性替代，如className取代class，htmlFor 取代 for
```jsx
<label className="aswsome-label" htmlFor="name" />
```
* 样式
样式期望传入JavaScript对象，并且是驼峰式命名法：
```jsx
<div sytle={{ backgroundColor: 'red' }} />
```
* 根元素
由于JSX会转为JavaScript函数，但js不允许返回两个函数，所以如果有多个同级元素，需要将它们封装在一个父元素中。
```jsx
// 这是错的
<div />
<div />

// 这是对的
<div>
  <div />
  <div />
</div>
```
* 空格
JSX会自动忽略标签直接的空格，如果需要使用空格，得显示插入空格
```jsx
<div>
  <span>foo</span>
  {' '}
  bar
</div>
```
* 布尔值属性
如果设置某个属性却没有赋值，JSX会默认为 `true` 。要将属性值设为 false，需要显示声明。
```jsx
<button disabled={false} />
```


## 2.2 ESLint
使用linter能够帮助我们更少犯错，或者更早发现错误，还能强制推行一些常见的编程风格指南。
使用ESLint，一般会在项目下创建 `.eslintrc` 文件来配置ESLint，使用rules属性来添加规则。
```json
{
  "rules": {
    "semi": [2, "never"]
  }
}
```
ESLint规则有三个等级来决定问题严重程度：
* off(或者0)：禁用规则
* warn(或者1)：规则会产生警告
* error(或者2)：规则会产生错误

启用ES6和JSX语法，需要添加配置项：
```json
"parserOptions": {
  "ecmaVersion": 6,
  "ecmaFeatures": {
    "jsx": true
  }
}
```

对于React，可以使用 `eslint-plugin-react` 插件。

ESLint的extends属性非常强大，可以从第三方配置入手，再添加自己特有的规则，推荐使用 Aribnb的配置规则。
```json
{
  "extends": "airbnb"
}
```

# 第3章 开发真正可复用的组件
## 3.1 创建类
定义React组件的主要方法：React.createClass和继承React.Component。
```jsx
const Button = React.createClass({
  render() {
    return <button />
  }
})

// es6，推荐使用
class Button extends React.Component {
  render() {
    return <button />
  }
}
```

### 主要区别
* prop及默认值的定义方式不同
createClass方法需要在作为参数传入函数的对象内定义prop，同时在getDefaultProps内定义默认值：
```javascript
const Button = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
  },
  getDefaultProps() {
    return {
      text: 'Click me!',
    }
  },
  render() {
    return <button>{this.props.text}</button>
  },
})
```
对于class定义方法：
```jsx
class Button extends React.Component {
  render() {
    return <button>{this.props.text}</button>
  }
}
Button.propTypes = {
  text: React.PropTypes.string,  // 在新版中PropTypes已经单独抽离出来了
}
Button.defaultProps = {
  text: 'Click me!',
}
```
* 状态
createClass定义初始状态：
```javascript
const Button = React.createClass({
  getInitialState() {
    return {
      text: 'Click me!',
    }
  },
  render() {
    return <button>{this.props.text}</button>
  },
})
```
使用类来定义状态，需要在类的构造器方法中设置：
```jsx
class Button extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'Click me!',
    }
  }
  render() {
    return <button>{this.props.text}</button>
  }
}
```
 
* 自动绑定
createClass在调用事件处理器时，this会指向组件本身。
```javascript
const Button = React.createClass({
  handleClick() {
    console.log(this)
  },
  render() {
    return <button onClick={this.handleClick} />
  },
})
```
使用类的方式定义时：
```jsx
class Button extends React.Component {
  handleClick() {
    console.log(this) // null
  }
  render() {
    return <button onClick={this.handleClick} />
  }
}
```
点击按钮后，控制台会输出 `null` 。
解决这个问题一种方案是使用箭头函数：
```jsx
class Button extends React.Component {
  handleClick() {
    console.log(this)
  }
  render() {
    return <button onClick={() => this.handleClick} />
  }
}
```
但使用箭头函数可能会带来无法预料的副作用，每次渲染组件时都会触发箭头函数，如果这个函数传递给子组件，子组件在每次更新过程中都会接收新的prop，就可能会引起低效的渲染。
一个好的解决方案是在构造器内进行绑定操作，即使多次渲染，也不会发生任何改变：
```jsx
class Button extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick(this)
  }
  handleClick() {
    console.log(this)
  }
  render() {
    return <button onClick={this.handleClick} />
  }
}
```

### 无状态函数式组件
还有另一种定义组件的方式：
```javascript
() => <button />
```
* props与上下文
无状态函数式组件可以接收props对象和上下文作为参数：
```jsx
(props, context) => (
  <button>{context.currency}{props.value}</button>
)
```
可以结合解构语法使用：
```jsx
({text}) => <button>{text}</button>
```
* this
this在无状态函数式组件的执行过程中不指向组件本身，无法使用组件实例相关的setState等方法和生命周期。
* 状态
无状态函数式组件没有任何内部状态。
* 生命周期
同上，无状态函数式组件没有生命周期钩子。
* ref与事件处理器
由于无状态函数式组件无法访问组件实例，需要按以下方式定义：
```jsx
() => {
  let input
  const onClick = () => input.focus()

  return (
    <div>
      <input ref={el => (input = el)} />
      <button onClick={onClick}>Focus</button>
    </div>
  )
}
```
* 没有组件引用
使用ReactTestUtils渲染无状态函数式组件，无法取回对组件的引用，解决方法是将组件包裹在一个<div>标签中。
```jsx
const Button = () => <button />
// const component = ReactTestUtils.renderIntoDocument(<Button />)
const component = ReactTestUtils.renderIntoDocument(<div><Button /></div>)
```
* 优化
因为没有shouldComponentUpdate方法，所以无法在props变化时才渲染函数式组件。

# 第6章 为浏览器编写代码
## 6.2 事件
React 在根元素上添加单个事件处理器，利用__事件冒泡机制__，处理器会监听所有事件。这个技巧称为__事件代理__。

## 6.3 ref
对非原生组件设置ref，接收到的回调参数引用不是 __DOM__ 节点实例，而是组件本身的实例，它允许我们访问子组件的内部实例，尽量避免这么做。

# 6.4 动画
介绍了两个动画库：
* [react-addons-css-transition-group](https://www.npmjs.com/package/react-addons-css-transition-group)  不过已经推荐使用 [CSSTransitionGroup](https://github.com/reactjs/react-transition-group) 了
* [react-motion](https://www.npmjs.com/package/react-motion) 

# 6.5 SVG
SVG 声明式描述矢量，和 React 理念很匹配。
可以直接封装一个SVG 元素：
```javascript
const Circle = ({ x, y, radius, fill }) => (
  <svg>
    <circle cx={x} cy={y} r={radius} fill={fill} />
  </svg>
)
```

# 第7章 美化组件
## 7.1 css in JavaScript
Christopher 在演讲中提到了大型css代码库的主要问题：
* 全局命名空间，所有选择器都是全局的，不管怎么命名组织样式，都会污染全局命名空间；
* 依赖
* 无用代码移除，很难判断哪些样式属于哪个组件，删除代码非常棘手；
* 选择器名和类名的压缩，对css大小有很大影响；
* 常量共享，常规的css很难做到在样式和客户端应用间共享常量；
* css解析方式的不确定性
* 样式隔离，很难在文件或组件间实现恰当的css隔离。选择器是全局的，很容易被覆盖。

## 7.2 行内样式
行内样式的局限性：
* 不能使用伪选择器和伪元素；
* 不能使用__媒体查询__；
* 不能使用回退样式，因为js对象不能包含两个同名属性；
* 动画也无法用行内样式模拟，只能全局定义动画，在元素的样式属性中使用；
* 覆盖常规css时，行内样式只能用 `!important` 关键词；
* 不方便调试，特别是对那些有相同样式属性的列表
* 在服务端渲染应用，使用行内样式会使页面体积变大；

## 7.3 Radium
使用Radium，可以在行内样式增加伪类和媒体查询等功能。Radium在内部使用js来模拟伪类，而不是css实现。


# 第9章 提升应用性能
## 9.1 一致性比较与key属性
一致性比较：
> 当渲染组件时，React调用自己的渲染方法，还会递归调用子组件的渲染方法。组件的渲染方法会返回React元素树，然后React根据它来判断更新UI需要执行哪些DOM操作。
> 当组件的状态发生变化时，React会再次调用该组件的渲染方法，将结果和之前的React元素进行比较。React能够计算出使屏幕上产生变化所需的最小操作集合，这个过程就称为 __一致性比较__ 

React会尽可能少的操作DOM，为了降低比较过程的开销及复杂度，引入了key属性来标记子组件，使得在渲染过程中得以保留。

开发过程中可以使用 `react-addons-perf` 来记录和显示性能相关的信息。
```jsx
import Perf from 'react-addons-perf'
class Counter extends React.Component {
  componentWillUpdate(){
    Perf.start()
  }
  componentDidUpdate() {
    Perf.stop()
    Perf.printOperations()
  }
  render() {
    return <div />
  }
}
```

> `react-addons-perf`这个插件在React 16不被支持，可以使用Chrome开发者工具进行查看，具体参考：[https://reactjs.org/docs/perf.html](https://reactjs.org/docs/perf.html)。

## 9.2 优化手段
* 对于生产环境，webpack配置开启压缩
```javascript
// 这里是老版本的配置了，webpack 4的配置发生了变化
new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})
new webpack.optimize.UglifyJsPlugin()
```
* 结合使用 shouldComponentUpdate 和 React.PureComponent
* 使用无状态组件并不会带来性能上的提升，将来可能会得到优化

## 9.3 常用解决方案
### why-did-you-update
开发模式使用 `why-did-you-update` ，可以告诉我们哪些组件可以避免重复渲染。
在React的import语句后面加上以下代码：
```javascript
if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(React)
}
```

### 渲染方法中创建函数
避免在render方法中创建新的函数。如：
```jsx
<button onClick={()=>this.handleClick} />
```
上述代码可以改为：
```jsx
constructor(props){
  super(props)
  this.handleClick = this.handleClick.bind(this)
}
render() {
  return <button onClick={this.handleClick} />
}
```
避免每次调用时产生新的回调函数，特别是在对子组件传递props时，防止子组件发生无用的重复渲染。

### props常量
传递props时，避免传递新的实例。如：
```jsx
<Item status={['open', 'close']} />
```
当父组件渲染时，组件props没有发生变化，但都会给Item组件传入新的数组实例，导致不必要的渲染。
可以改成：
```jsx
const status = ['open', 'close']
...
<Item status={status} />
```

### 重构与良好设计
将组件拆分成多个小组件，各自负责简单的职责和状态，组件间的交互通过父组件实现，避免一处更改其他也渲染的情况。

## 9.4 工具与库
### 不可变性
对应复杂的数据，每次修改对象时都创建新的实例：
```javascript
const obj = Object.assign({}, this.state.obj, { foo: 'bar' })
this.setState({ obj })
// 或者使用展开操作符
const obj = { ...this.state.obj, foo: 'bar' }
this.setState({ obj })
```

也可以结合 immutable.js。

### 性能监控工具
前面介绍了  `react-addons-perf` 工具，但是需要修改代码，并且对我们的进行了污染。可以使用 `chrome-react-perf` 扩展工具。
另一个工具是 `react-perf-tool` ，它会在页面底部显示一个控制台，在这里开启或关闭监控。

### Babel插件
* babel-plugin-transform-react-constant-elements，常量元素转换器，它会寻找不随props改变的所有静态元素，将它们从渲染方法中抽离出来；
* babel-plugin-transform-react-inline-elements，行内元素转换器，将所有jsx声明替换成优化过的版本。
这两个插件只应该在生产环境中启用，它会使开发环境中的调试变得困难。

# 第10章
## 10.1 测试的好处
Web UI测试一直很难，如果测试难以编写和维护，很难讲测试覆盖整个应用。
React组件化的开发方式使得UI的测试变得更加简单和高效，如果合理地开发组件，做到模块化和可复用，也能像简单函数那样测试她们。
编写测试的技巧有很多，__测试驱动开发（TDD）__ 是其中流行的一种，即先编写测试，再编写能够通过测试的代码。

## 10.2 用Jest测试JavaScript
使用Jest需要安装，
```bash
npm install --save-dev jest
```
并在package.json中添加以下脚本：
```json
"script": {
  "test": "jest"
}
```
Jest会在源代码文件夹中寻找以 `.spec` 、 `.test` 结尾的文件，或者位于 `__test__folder` 文件夹下的文件。

在React中，结合 `react-addons-test-utils` 进行测试，TestUtils库提供的函数可以用来浅渲染组件，还能模拟浏览器事件。使用方法可以看书或者官方文档，这里不不一一列出了。

## 10.3 Mocha
Jest是一个高度集成的测试框架，尝试自动完成一切操作，而Mocha需要你自行决定使用哪些工具来测试。
使用Mocha，除了上述的 `react-addons-test-utils` 外，还需要配合使用其他包：`chai` 、 `chai-spies` 、 `jsdom` 。
* chai 编写预测代码
* chai-spies 用于检查方法是否被调用过
* jsdom 用于创建独立DOM
Mocha约定测试用例放在 test 文件夹下。

## 10.4 Enzyme
使用 TestUtils 比较繁琐，Airbnb 开发了 Enzyme，它基于TestUtils构建，可以更方便地操作渲染后的组件。

## 10.7 代码覆盖率工具
流行的代码覆盖率工具之一是 Istanbul ，Jest内置，Mocha需要手动安装。
对于Jest，在命令后加上 `-coverage` 即可：
```bash
jest -coverage
```


## 10.9 React开发者工具
安装Chrome扩展工具 `react-developer-tools` 即可。

## 10.10 React错误处理
在React中，如果单个组件抛出异常，它会停止渲染整棵树。这么做是为了提升安全性，也避免了状态不一致。
如果想在一个组件发生错误时，不影响其他组件的继续渲染，可以使用 `react-component-errors` 库，它会给所有组件方法上加上猴子补丁，并封装到 `try...catch` 中，这种做法在性能与库的兼容性方面有一定缺陷，在生产环境尽量避免使用。

# 第11章 需要避免的反模式
## 11.1 用prop 初始化状态
应该避免使用prop来初始化状态，如：
```jsx
// Counter
constructor(props){
  super(props)

  this.state = {
    count: props.count
  }
}
// parent
<Counter count={1} />
```

主要由两个原因：
* 违背了单一数据源原则；
* 传给组件的count发生改变，状态不会相应的更新。

建议使用一个初始值的属性来表达这个含义：
```jsx
// Counter
constructor(props){
  super(props)

  this.state = {
    count: props.initialCount
  }
}
// parent
<Counter initialCount={1} />
```

## 11.2 修改状态
对应状态的修改，一定要使用 `setState` 方法进行修改，不要试图直接修改状态对象。

## 11.3 将数组索引作为key
对于key属性，要保证唯一性和稳定，在对数组进行迭代渲染时，避免使用数组索引作为key，数组更改了，但是key不变会导致意外的情况发生。

## 11.4 在DOM元素上展开props对象
使用展开操作符，能够方便很多。然而，对于DOM元素，如果展开props对象，就会有添加未知HTML属性的风险，尽量使用确定的props进行操作。


# 第12章 未来的行动
* 给React提issue或者pull request。
* 分享自己的代码
* 发布npm包


