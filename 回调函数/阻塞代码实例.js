/**
 * Created by Administrator on 2016-07-14.
 */
var fs = require("fs");
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log("文件读取结束，程序终止！");