/**
 * Created by Administrator on 2017/2/27.
 * 通过本地phoneNumber.txt文件获取各省市号码段
 */
const fs = require('fs');
const linereader = require('line-reader');
const https = require('https');
const iconv = require('iconv-lite');

const addressUrl = 'https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?co=&resource_id=6004&t=1488245447067&ie=utf8&oe=gbk&cb=op_aladdin_callback&format=json&tn=baidu&cb=jQuery110202676949236702635_1488245429796&_=1488245429798&query=';
const numberSegmentByLocal = 'numberSegmentByLocal.txt';

let length;
var numberRegion = [];

/*
 * https的get请求
 * 参数：url（请求地址）,success（请求成功回调）
 * */
function httpsGet(url, success) {
    https.get(url, function (res) {
        if (typeof success === "function")
            success(res);
    }).on("error", function () {
        console.log("请求失败，重新执行");
        httpsGet(url, success);
    });
}

/*
 * 读取phoneNumber.txt调用百度接口
 * */
function readNumberRegion() {
    linereader.eachLine('phoneNumber.txt', function (line) {
        let arr = line.toString().split('	');
        let number = arr[0] + '6560';
        console.log(number);

        httpsGet(addressUrl + number, function (res) {
            let datas = [];
            let size = 0;
            res.on('data', function (data) {
                datas.push(data);
                size += data.length;
            });
            res.on("end", function () {
                let buff = Buffer.concat(datas, size);
                let result = iconv.decode(buff, "gb2312");//转码//var result = buff.toString();//不需要转编码,直接tostring
                let index = result.indexOf('(');
                let dataStr = result.substr(index + 1, result.length - index - 3);
                let dataJson = JSON.parse(dataStr);
                let data = dataJson.data[0];
                data.prov = !!data.prov ? data.prov : data.city;
                let txtContent = `${data.key.substr(0, 3)} ${data.key} ${data.prov} ${data.city} ${data.type}\r\n`;
                appendFile(data.key, txtContent, numberSegmentByLocal);
            });
        });
    });
}

/*
 * 将文本追加写入到numberSegmentByLocal.txt中
 * 参数：key（号段），content（写入的内容）
 * */
function appendFile(key, content, fileName) {
    fs.appendFile(fileName, content, 'utf8', function (err) {
        if (err) {
            appendFile(key, content, fileName);
        } else {
            console.log(`${key}数据写入成功`);
        }
    });
}

function Run() {
    fs.exists(numberSegmentByLocal, function (isExist) {
        if (isExist) {
            fs.unlink(numberSegmentByLocal, readNumberRegion)
        }
    });
}

exports.run = Run;