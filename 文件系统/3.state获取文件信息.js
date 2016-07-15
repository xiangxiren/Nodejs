/**
 * Created by Administrator on 2016-07-15.
 */
/*
 *
 * 语法
 *  以下为通过异步模式获取文件信息的语法格式：
 *  fs.stat(path, callback)
 * 参数
 * 参数使用说明如下：
 * path - 文件路径。
 * callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象。
 *
 * */

var fs = require('fs');
//fs.stat(),异步获取文件信息
fs.stat('E:\\Project\\Nodejs\\文件系统', function (err, stats) {
    if (err) {
        return console.error(err);
    }
    console.log("读取文件信息成功！");
    console.log(stats)
    console.log('是否为文件：', stats.isFile()); //是否是文件
    console.log('是否为目录：', stats.isDirectory()); //是否是目录
});