/**
 * Created by Administrator on 2016-07-15.
 */
var express= require('express');
var app= express();

//express.static  中间件来设置静态文件路径
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('Hello World');
});

var server =app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});