/**
 * Created by Administrator on 2017/2/28.
 * 获取省市数据
 */
const http = require('http');
const fs = require('fs');

const provinceUrl = 'http://cpdc.chinapost.com.cn/web/api.php?op=get_linkage&act=ajax_select&keyid=1&parent_id=0';
const cityUrl = 'http://cpdc.chinapost.com.cn/web/api.php?op=get_linkage&act=ajax_select&keyid=1&parent_id=';

let length;
let provinces = [];

function httpGet(url, callback) {
    http.get(url, function (res) {
        var html = '';

        res.on('data', function (data) {
            html += data;
        });

        res.on('end', function () {
            if (typeof callback === 'function')
                callback(html);
        });
    }).on('error', function () {
        console.log('获取数据出错')
    });
}

function getProvince() {
    httpGet(provinceUrl, function (html) {
        var provinces = JSON.parse(html);
        length = provinces.length;
        for (let province of provinces) {
            getCityByProvince(province);
        }
    });
}

function getCityByProvince(province) {
    httpGet(cityUrl + province.region_id, function (html) {
        var cities = JSON.parse(html);
        var provinceData = {code: province.region_id, name: province.region_name, cities: []};
        for (let city of cities) {
            provinceData.cities.push(city.region_name);
        }
        provinces.push(provinceData);
        if (provinces.length === length) {
            provinces = provinces.sort(function (first, second) {
                return first.code - second.code;
            });
            fs.writeFile('province.json', JSON.stringify(provinces), 'utf8', function (err) {
                if (err) {
                    return console.log(err.message);
                } else {
                    console.log('数据写入成功')
                }
            });
        }
    });
}

exports.run = getProvince;