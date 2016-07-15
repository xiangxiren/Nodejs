/**
 * Created by Administrator on 2016-07-15.
 */
/*
 *
 * 语法
 * 以下为删除目录的语法格式：
 * fs.rmdir(path, callback)
 * 参数
 * 参数使用说明如下：
 * path - 文件路径。
 * callback - 回调函数，没有参数。
 *
 * */

var fs = require('fs');
console.log('读取 ./ 目录');
fs.readdir('./', function (err, files) {
    if (err) {
        return console.error(err);
    }

    files.forEach(function (file) {
        console.log(file);
    })

    console.log('删除 ./test 目录');
    fs.rmdir('./test', function (err) {
        if (err) {
            return console.error(err);
        }

        console.log('读取 ./ 目录');
        fs.readdir('./', function (err, files) {
            if (err) {
                return console.error(err);
            }

            files.forEach(function (file) {
                console.log(file);
            });
        });
    });
})