/**
 * Created by Administrator on 2016-07-14.
 */

console.log(__filename);//输出文件的完整路径
console.log(__dirname);//输出文件所在的目录

function printHello() {
    console.log("Hello World!");
}

//2秒后执行以上函数
setTimeout(printHello, 2000);

function clearFunction() {
    console.log("Clear setTimeOut");
}

var t = setTimeout(clearFunction, 2000);
//清楚定时器
clearTimeout(t);

function sayHello() {
    console.log("hello");
}
//间隔2秒执行一次
setInterval(sayHello, 2000);

function sayHello1() {
    console.log(hello1);
}

var t1 = setInterval(sayHello1, 2000);
clearInterval(t1);
