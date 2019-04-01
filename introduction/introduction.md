# 介绍

## 声明式渲染

html 页面上使用类似 jinja2 的模板式声明 `{{ }}` 以双花括号包裹，然后在 `js` 文件中定义新的 `Vue` 对象， 其中用 el 成员的选择器选中需要的元素(选择器与 `jquery` 相同)，使用 `data` 成员对模板中定义的变量进行就赋值。

模板式渲染的时候都是**响应式**的，通过更改 `Vue` 对象的模板变量值来动态改变

### 绑定元素特性

实例中的 `app-2` 使用的 `v-bind` 特性被称为**指令**。 

一般**指令**以 `v-` 为前缀，在DOM渲染时会为元素加上特殊的响应行为，实例中的指令意思是：“将这个元素节点的 `title` 特性和 `Vue` 实例的 `message` 属性保持一致”。

通过改变 `app2.message` 的值来改变更新页面

### 条件和循环

实例见 `app-3`, `v-if` 表示选择, `v-for` 表示循环

### 处理用户输入

为了让用户和应用进行交互，可以用 `v-on` 指令添加一个事件监听器， 例子见 `app-5`

在 `reverseMessage` 方法中，更新了应用的状态，但没有触碰 `DOM` ——所有的 `DOM` 操作都由 `Vue` 来处理，代码只需要关注逻辑层面即可。

`Vue` 还提供了 `v-model` 指令，它能轻松实现表单输入和应用状态之间的双向绑定,例子见 `app-6`。

### 组件 component

在 `Vue` 里，一个组件本质上是一个拥有预定义选项的一个 `Vue` 实例。

组件的定义方式见例子 `app-7`

实例解释：

```html
<div id="app-7">
  <ol>
    <!--
      现在我们为每个 todo-item 提供 todo 对象
      todo 对象是变量，即其内容可以是动态的。
      我们也需要为每个组件提供一个“key”，稍后再
      作详细解释。
    -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></todo-item>
  </ol>
</div>
```

```js
Vue.component('todo-item', {
  // todo-item 组件现在接受一个
  // "prop"，类似于一个自定义特性。
  // 这个 prop 名为 todo。
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: '蔬菜' },
      { id: 1, text: '奶酪' },
      { id: 2, text: '随便其它什么人吃的东西' }
    ]
  }
})
```

尽管这只是一个刻意设计的例子，但是我们已经设法将应用分割成了**两个更小的单元**。子单元通过 `prop` 接口与父单元进行了良好的**解耦**。我们现在可以进一步改进 `<todo-item>` 组件，提供更为复杂的模板和逻辑，而不会影响到父单元。

在一个大型应用中，有必要将整个应用程序划分为组件，以使开发更易管理。在后续教程中我们将详述组件，不过这里有一个 (假想的) 例子，以展示使用了组件的应用模板是什么样的：

```html
<div id="app">
  <app-nav></app-nav>
  <app-view>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
  </app-view>
</div>
```
