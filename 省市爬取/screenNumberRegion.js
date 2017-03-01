/**
 * Created by Administrator on 2017/3/1.
 */
const fs = require('fs');
const linereader = require('line-reader');

const numberSegmentByLocal = 'numberSegmentByLocal.txt';

function readNumberRegion() {
    linereader.eachLine(numberSegmentByLocal, function (line, last) {
        let arr = line.toString().split(' ');
        let segment = arr[1];
        let province = arr[2];
        let city = arr[3];
        createProvince(province, function () {
            appendFile(segment, arr + '\r\n', `${province}/${city}.txt`);
        });
        if (last) {
            console.log('分类完成');
        }
    });
}

function createProvince(province, callback) {
    fs.exists(province, function (isExist) {
        if (!isExist) {
            fs.mkdir(province, function (err) {
                if (err)
                    createProvince(province, callback);
                else
                    executeCallBack(callback);
            })
        }
        else
            executeCallBack(callback);
    });
}

function appendFile(key, content, path) {
    fs.appendFile(path, content, 'utf8', function (err) {
        if (err) {
            appendFile(key, content, path);
        } else {
            console.log(`${key}数据写入成功`);
        }
    });
}

function executeCallBack(callback) {
    if (typeof callback === 'function')
        callback();
}

exports.run = readNumberRegion;

/*
*
 181 中国电信
 184 中国移动
 185 中国联通
 176 中国联通
 177 中国电信
 178 中国移动

 145 中国联通
*
*
* */