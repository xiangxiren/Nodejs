/**
 * Created by Administrator on 2016-07-15.
 */
var express = require('express');
var util = require('util');
var app = express();

app.get('/', function (req, res) {
    //console.log(util.inspect(req));
    res.end('Hello World');
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    console.log(server.address());
    var port = server.address().port;

    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});

