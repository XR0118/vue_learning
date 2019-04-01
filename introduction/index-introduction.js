// 声明式渲染
var app = new Vue({
    el: '#app',
    data: {
        message: 'hello world',
        rawHtml: '<span style="color:red">123<span>'
    }
});

var app2 = new Vue({
    el: '#app-2',
    data: {
        message: '页面加载于 ' + new Date().toLocaleString()
    }
});

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
});

var app4 = new Vue({
    el: '#app-4',
    data:{
        todos: [
            {text: 123},
            {text: 456}
        ]
    }
});

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'hello',
        isButtonDisabled: true
    },
    methods: {
        reverseMessage: function() {
            this.message = this.message.split('').reverse().join('')
        }
    }
})

var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'hello'
    },
});

// 组件定义

Vue.component('todo-item', {
    props: ['todo'],
    template: "<li> {{ todo.text }} </li>"
})

var app7 = new Vue({
    el: "#app-7",
    data: {
        todos: [
            {id: 1, text: "123"},
            {id:2, text: "234"}
        ]
    }
});