# 模板语法


## 插值

### 文本

“Mustache”语法 (双大括号) 的文本插值 与jinja2一致：

```html
<span>Message: {{ msg }}</span>
```

`msg` 会绑定 VUE 实例 `data` 中 `msg` 对应的值，并且能够**响应式**变化。

通过 `v-once` 指令能够一次性插值，即插值处的内容不会更新，但是实例中的属性还是会变化。

## 原始 html

实例见 `introduction/index.html` 中的 `app`：

```html
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

**tips:**不能使用 v-html 来复合局部模板

### 特性

“Mustache”语法不能作用于 html 标签的属性上，因此需要通过 `v-bind` 指令来实现，例子见 `introduction/index.html` 的 `app-5`

```html
<div v-bind:id="dynamicId"></div> // 动态 id 属性
<button v-bind:disabled="isButtonDisabled">Button</button> // 动态 disabled 属性
```

### 使用 JS 表达式

简单的例子：

```html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

**限制：**只能包含**单个表达式**，反例如下：

```html
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

## 指令

指令带有 `v-` 前缀， 指令特性的值预期是**单个 JavaScript 表达式**。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。

### 参数

一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例子：

```html
<a v-bind:href="url">...</a>
```

在这里 `href` 是参数，告知 `v-bind` 指令将该元素的 `href` 特性与表达式 `url` 的值绑定。

另一个例子是 `v-on` 指令，它用于监听 DOM 事件：

```html
<a v-on:click="doSomething">...</a>
```

### 动态参数(2.6.0 新增)

从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```html
<a v-bind:[attributeName]="url"> ... </a>
```

这里的 `attributeName` 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的 `Vue` 实例有一个 `data` 属性 `attributeName`，其值为 `"href"`，那么这个绑定将等价于 `v-bind:href`。

同样地，你可以使用动态参数为一个动态的事件名绑定处理函数：

```html
<a v-on:[eventName]="doSomething"> ... </a>
```

同样地，当 `eventName` 的值为 `"focus"` 时，`v-on:[eventName]` 将等价于 `v-on:focus`。

**动态参数值的约束** 

动态参数预期会求出一个字符串，异常情况下值为 null。这个特殊的 null 值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告。

**对动态参数表达式的约束**

动态参数表达式有一些语法约束，因为某些字符，例如空格和引号，放在 HTML 特性名里是无效的。同样，在 DOM 中使用模板时你需要回避大写键名。

另外，如果你在 DOM 中使用模板 (直接在一个 HTML 文件里撰写模板)，需要留意浏览器会把特性名全部强制转为小写：

```html
<!-- 在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]` -->
<a v-bind:[someAttr]="value"> ... </a>
```

### 修饰符

修饰符 (modifier) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，`.prevent` 修饰符告诉 `v-on` 指令对于触发的事件调用 `event.preventDefault()`：

```html
<form v-on:submit.prevent="onSubmit">...</form>
```
