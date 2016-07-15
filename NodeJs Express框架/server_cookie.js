/**
 * Created by Administrator on 2016-07-15.
 */
var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());

app.get('/', function (req, res) {
    console.log("Cookies: ", req.cookies);
    res.end('OK');
});

app.listen(8081);