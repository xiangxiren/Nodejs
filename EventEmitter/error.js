/**
 * Created by Administrator on 2016-07-14.
 */
var events = require('events');
var emitter = new events.EventEmitter();
emitter.on('error', function (err) {
    console.log(err);
});
emitter.emit('error');