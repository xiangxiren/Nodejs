/**
 * Created by Administrator on 2016-07-15.
 */
var path = require('path');

//格式化路径
console.log('normalization :' + path.normalize('test/test1/2slashes/1slash/tab/..'));

//连接路径
console.log('join path :' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));

//转为绝对路径
console.log('resolve : ' + path.resolve('main.js'));

//路径中文件的后缀名
console.log('extt name : ' + path.extname('main.js'));