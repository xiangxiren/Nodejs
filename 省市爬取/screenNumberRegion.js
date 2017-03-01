/**
 * Created by Administrator on 2017/3/1.
 */
const fs = require('fs');
const linereader = require('line-reader');

const numberSegmentByLocal = 'numberSegmentByLocal.txt';

function readNumberRegion() {
    linereader.eachLine(numberSegmentByLocal, function (line) {
        let arr = line.toString().split(' ');
        let segment = arr[1];
        let province = arr[2];
        let city = arr[3];
        let path = `${province}/${city}/${numberSegmentByLocal}`;
        createProvince(province, function () {
            createCity(province, city, function () {
                appendFile(segment, arr + '\r\n', path);
            })
        });
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

function createCity(province, city, callback) {
    let path = `${province}/${city}`;

    fs.exists(path, function (isExist) {
        if (!isExist) {
            fs.mkdir(path, function (err) {
                if (err)
                    createCity(province, city, callback)
                else
                    executeCallBack(callback);
            })
        } else
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