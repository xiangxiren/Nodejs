/**
 * Created by Administrator on 2016-07-14.
 */
//解压文件
var fs = require('fs');
var zlib = require('zlib');

//解压文件 input.txt.gz 文件为input.txt
fs.createReadStream('input.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('input2.txt'))

console.log('文件解压完成');