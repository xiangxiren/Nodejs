/**
 * Created by Administrator on 2017/2/27.
 * 通过本地phoneNumber.txt文件获取各省市号码段
 */
const fs = require('fs');
const linereader = require('line-reader');
const https = require('https');
const iconv = require('iconv-lite');

const addressUrl = 'https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?co=&resource_id=6004&t=1488245447067&ie=utf8&oe=gbk&cb=op_aladdin_callback&format=json&tn=baidu&cb=jQuery110202676949236702635_1488245429796&_=1488245429798&query=';

let length;
let buf = new Buffer(12000000);
var numberRegion = [];

function httpsGet(url, success) {
    https.get(url, function (res) {
        if (typeof success === "function")
            success(res);
    }).on("error", function () {
        console.log("请求失败，重新执行");
        httpsGet(url, success);
    });
}

function readNumberRegion() {
    linereader.eachLine('phoneNumber.txt', function (line, last) {
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
                numberRegion.push({
                    key: data.key.substr(0, 3),
                    segment: data.key,
                    prov: data.prov,
                    city: data.city,
                    type: data.type
                });
            });
        });

        if (last) {
            numberRegion = numberRegion.sort(function (first, second) {
                return first.segment - second.segment;
            });
            fs.writeFile('numberSegmentByLocal.json', JSON.stringify(numberRegion), 'utf8', function (err) {
                if (err) {
                    return console.log(err.message);
                }else   {
                    console.log('数据写入成功');
                }
            });
        }
    });
}

function Run() {
    readNumberRegion();
}

exports.run = Run;