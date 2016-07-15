/**
 * Created by Administrator on 2016-07-14.
 */
//压缩文件
var fs = require('fs');
var zlib = require('zlib');

//压缩input.txt 文件为input.txt.gz
fs.createReadStream('input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('input.txt.gz'));

console.log('压缩完成');