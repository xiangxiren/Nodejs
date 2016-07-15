/**
 * Created by Administrator on 2016-07-14.
 */
//util.inherits(constructor, superConstructor)是一个实现对象间原型继承 的函数
var util = require('util');
function Base() {
    this.name = 'base';
    this.base = '1992';
    this.sayHello = function () {
        console.log('Hello ' + this.name);
    }
}
Base.prototype.showName = function () {
    console.log(this.name);
}

Base.prototype.title = 'Alpha';

function Sub() {
    this.name = 'sub'
}
util.inherits(Sub, Base);
var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);

var objSub = new Sub();
objSub.showName();
//objSub.sayHello();//仅仅继承Base在原型中定义的函数，而构造函数内部创造的base属性和sayHello函数都没有被继承
//同时，在原型中定义的属性不会被console.log作为对象的属性输出。
console.log(objSub);
console.log(objSub.title);

//util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换 为字符串的方法。
console.log('\nutil.inspect方法');
function Person() {
    this.name = 'byvoid';
    this.toString = function () {
        return this.name;
    }
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true));//第二个参数为 true，将会输出更多隐藏信息
console.log(util.inspect(obj, true, 2));//第三个参数为最大递归的岑姝
console.log(util.inspect(obj, true, null, true));//第四个参数为 true，输出格式将会以ANSI 颜色编码

//util.isArray(object),判断给定参数是否是一个数组
console.log('\nutil.isArray方法');
console.log(util.isArray([]));
console.log(util.isArray(new Array));
console.log(util.isArray({}));

//util.isRegExp(obj)，判断给定参数是否是一个正则表达式
console.log('\nutil.isRegExp方法');
console.log(util.isRegExp(/some regexp/));
console.log(util.isRegExp(new RegExp('another regexp')));
console.log(util.isRegExp({}));

//util.isDate(obj)，判断给定参数是否是一个日期
console.log('\nutil.isDate方法');
console.log(util.isDate(new Date()));
console.log(util.isDate(Date())); //without 'new' returns a String
console.log(util.isDate({}));

//util.isError(obj)，判断给定参数是否是一个错误对象
console.log('\nutil.isError方法');
console.log(util.isError(new Error()));
console.log(util.isError(new TypeError()));
console.log(util.isError({name: 'Error', message: 'an error occurred'}));