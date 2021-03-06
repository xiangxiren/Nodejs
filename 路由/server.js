/**
 * Created by Administrator on 2016-07-14.
 */
var http = require('http');
var url = require('url');

function start(route, handle) {
    http.createServer(function (request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        request.setEncoding('utf8');

        request.addListener('data', function (chunk) {
            postData += chunk;
            console.log("Received POST data chunk '" +
                chunk + "'.");
        });

        request.addListener('end', function () {
            route(handle, pathname, response, postData);
        });
    }).listen(8888);
    console.log("Server has started.");
}

exports.start = start;