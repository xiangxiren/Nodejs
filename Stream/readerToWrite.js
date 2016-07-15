/**
 * Created by Administrator on 2016-07-14.
 */
var fs = require('fs');

//创建一个可读流
var readerStream = fs.createReadStream('input2.txt');

//创建一个可写流
var writeStream = fs.createWriteStream('output2.txt');

//管道读写操作
//读取 input.txt 文件内容，并将内容写入到output.txt文件中
readerStream.pipe(writeStream);

console.log('程序执行完毕');