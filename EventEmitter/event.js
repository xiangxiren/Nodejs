//引入 exvents 模块
var events = require('events');

var event = new events.EventEmitter();

event.on('some_event', function (arg1, arg2) {
    console.log('some_event 事件触发：listener1监听', arg1, arg2);
});

event.on('some_event', function (arg1, arg2) {
    console.log('some_event 事件触发：listener2监听', arg1, arg2);
});

setTimeout(function () {
    event.emit('some_event', 'arg1参数', 'arg2参数');
}, 1000);

//EventEmitter 提供了多个属性。on函数用于绑定事件函数，emit用于触发一个事件