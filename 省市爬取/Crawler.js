/**
 * Created by Administrator on 2017/2/27.
 */
let http = require('http');
let fs = require('fs');
let path = require('path');
let cheerio = require('cheerio');
let provinceUrl = 'http://cpdc.chinapost.com.cn/web/api.php?op=get_linkage&act=ajax_select&keyid=1&parent_id=0';
let cityUrl ='http://cpdc.chinapost.com.cn/web/api.php?op=get_linkage&act=ajax_select&keyid=1&parent_id=';
let length;
let provinces = [];

function getProvince(){
    http.get(provinceUrl, function (res) {
        var html = '';

        res.on('data', function (data) {
            html += data;
        });

        res.on('end', function () {
            var provinces = JSON.parse(html);
            length = provinces.length;
            for(let province of provinces){
                getCityByProvince(province);
            }
        });
    }).on('error', function () {
        console.log('获取数据出错')
    });
}

function getCityByProvince(province){
    http.get(cityUrl + province.region_id, function (res) {
        var html = '';

        res.on('data', function (data) {
            html += data;
        });

        res.on('end', function () {
            var cities = JSON.parse(html);
            var provinceData = { code: province.region_id, name: province.region_name, cities: []};
            for(let city of cities){
                provinceData.cities.push(city.region_name);
            }
            provinces.push(provinceData);
            if(provinces.length === length){
                provinces = provinces.sort(function(first, second){
                    return first.code - second.code;
                });
                fs.writeFile('province.json', JSON.stringify(provinces), 'utf8', function (err) {
                    if (err) {
                        return console.log(err.message);
                    }
                });
            }
        });
    }).on('error', function () {
        console.log('获取数据出错')
    });
}

function Run() {
    getProvince();
}

exports.run = Run;