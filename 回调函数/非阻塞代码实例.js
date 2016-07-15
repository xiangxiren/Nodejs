/**
 * Created by Administrator on 2016-07-14.
 */
var fs = require("fs");
fs.readFile('input.txt', function (err, data) {
    //if (err)return console.error(err);
    if(err){
        console.log(err.stack);
        return;
    }
    console.log(data.toString());
});

console.log("文件读取结束，程序终止！");