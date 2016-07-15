/**
 * Created by Administrator on 2016-07-14.
 */
var server = require('./server');
var router = require('./router');

server.start(router.route)
