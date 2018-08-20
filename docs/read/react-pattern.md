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


# 第10章
## 10.10 React错误处理
在React中，如果单个组件抛出异常，它会停止渲染整棵树。这么做是为了提升安全性，也避免了状态不一致。
如果想在一个组件发生错误时，不影响其他组件的继续渲染，可以使用 `react-component-errors` 库，它会给所有组件方法上加上猴子补丁，并封装到 `try...catch` 中，这种做法在性能与库的兼容性方面有一定缺陷，在生产环境尽量避免使用。




