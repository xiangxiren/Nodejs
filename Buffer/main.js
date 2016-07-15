/**
 * Created by Administrator on 2016-07-14.
 */
var buf = new Buffer(256);
//写入缓冲区
var len = buf.write("www.runoob.com");

console.log('写入字节数： ' + len);

buf = new Buffer(26);
for (var i = 0; i < 26; i++) {
    buf[i] = i + 97;
}

//从缓冲区读取数据 buf.toString()
console.log(buf.toString('ascii'));
console.log(buf.toString('ascii', 0, 5));
console.log(buf.toString('utf8', 0, 5));
console.log(buf.toString(undefined, 0, 5)); //默认使用'utf8'编码

buf = new Buffer('www.runoob.com');
//将Buffer转换为Json对象
var json = buf.toJSON();
console.log(json);

var buf1 = new Buffer('菜鸟教程 ');
var buf2 = new Buffer('http://www.runoob.com');
//缓冲区合并
var buf3 = Buffer.concat([buf1, buf2]);
console.log('buf3的内容：' + buf3.toString());

var buffer1 = new Buffer('ABC');
var buffer2 = new Buffer('ABCD');
//缓冲区比较
var result = buffer1.compare(buffer2);

if (result < 0) {
    console.log(buffer1 + '在' + buffer2 + '之前');
} else if (result === 0) {
    console.log(buffer1 + '与' + buffer2 + '相同');
}
else {
    console.log(buffer1 + '与' + buffer2 + '之后');
}

var buffer4 = new Buffer('ABC');
//拷贝一个缓冲区
var buffer5 = new Buffer(3);
buffer1.copy(buffer5);
console.log("buffer5's content: " + buffer5.toString());

var buffer6 = new Buffer('runoob');
//剪切缓冲区
var buffer7 = buffer6.slice(0, 2);
console.log('buffer7\' content : ' + buffer7.toString());

var buffer = new Buffer('www.runoob.com');
//缓冲区长度
console.log('buffer length: ' + buffer.length);