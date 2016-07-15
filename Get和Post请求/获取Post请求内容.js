/**
 * Created by Administrator on 2016-07-15.
 */
var http = require('http');
var queryString = require('querystring');
var util = require('util');

http.createServer(function (request, response) {
    var post = ''; //定义一个post变量，用于暂存请求体的信息
    request.on('data', function (chunk) {//通过request的data事件监听函数，每当接受到请求体的数据，就累加
        post += chunk;
    });
    console.log(post);
    request.on('end', function () {//在end事件触发后，通过queryString.parse将post解析为真正的POST请求格式，然后向客户端返回
        post = queryString.parse(post);
        console.log(post);
        response.end(util.inspect(post));
    });
}).listen(3000);
console.log('http server start at port:3000...');