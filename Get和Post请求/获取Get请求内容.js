/**
 * Created by Administrator on 2016-07-15.
 */
var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function (request, response) {
    console.log(request.url);
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(util.inspect(url.parse(request.url, true)));
}).listen(3000);
console.log('http server start at port:3000...');