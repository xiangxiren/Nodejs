/**
 * Created by Administrator on 2016-07-14.
 */
var hello1 = require('./hello1');
hello1.world();

var hello2 = require('./hello2');
var hello2 = new hello2();
hello2.setName('BYVold');
hello2.sayHello();
