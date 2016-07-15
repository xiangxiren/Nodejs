/**
 * Created by Administrator on 2016-07-14.
 */
//把一个对象封装到模块中
function Hello2() {
    var name;
    this.setName = function (thyName) {
        name = thyName;
    };
    this.sayHello = function () {
        console.log('Hello ' + name + '！');
    };
}
module.exports = Hello2;