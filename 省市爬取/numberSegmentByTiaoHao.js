/**
 * Created by Administrator on 2017/2/28.
 * 获取省市号码段 来自挑号网http://www.tiaohao.com/others/haoduan.asp
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
var bufferhelper = require('bufferhelper');

const url = 'http://www.tiaohao.com/others/haoduan.asp?sh=';

let provinceArr = ['北京', '上海', '广东', '重庆', '天津', '浙江', '福建', '江苏', '山东', '山西', '陕西', '四川', '湖南', '湖北', '河北', '河南', '海南', '安徽', '甘肃', '广西', '黑龙江', '吉林', '辽宁', '贵州', '江西', '内蒙古', '宁夏', '青海', '云南', '新疆', '西藏']


function chinese2Gb2312(data) {
    var gb2312 = iconv.encode(data.toString('UCS2'), 'GB2312');
    var gb2312Hex = '';
    for (var i = 0; i < gb2312.length; ++i) {
        gb2312Hex += '%' + gb2312[i].toString(16).toUpperCase();
    }
    return gb2312Hex;
}

function filterCity(province, code, html) {
    var $ = cheerio.load(html);
    var chapters = $('.filterPrice').eq(1);
    var courseData;
    chapters.each(function () {
            var chapter = $(this);
            var ems = chapter.find('em');
            var chapterData = {
                name: province,
                code: code,
                cities: []
            };
            ems.each(function () {
                let name = $(this).text();
                if (name !== '全部') {
                    let cityCode = chinese2Gb2312(name);
                    let city = {name: name, code: cityCode};
                    chapterData.cities.push(city);
                }
            });

            courseData = chapterData;
        }
    );

    return courseData;
}

function filterNumberSegment(html) {
    var $ = cheerio.load(html);
    var chapters = $('.registItemsn');
    var numberArr = [];
    chapters.each(function () {
            var chapter = $(this);
            var links = chapter.find('a.t-b');
            links.each(function () {
                numberArr.push($(this).text());
            });
        }
    );

    return numberArr;
}

function getNumberSegment(proCityCode) {
    let count = 1;
    for (let proCode of proCityCode) {
        console.log(proCode);
        for (let city of proCode.cities) {
            console.log(`开始读取${proCode.name}-${city.name}`);

            httpGet(url + proCode.code + '&cs=' + city.code, function (html) {
                city.numbers = filterNumberSegment(html);
                console.log(`${proCode.name}-${city.name}结束`);
                count++;
                if (proCityCode.length === count) {
                    fs.writeFile('numberSegmentByTiaoHao.json', JSON.stringify(proCityCode), 'utf8', function (err) {
                        if (err) {
                            return console.log(err.message);
                        } else {
                            console.log('数据写入成功')
                        }
                    });
                }
            });
        }
    }
}

function httpGet(url, callback) {
    http.get(url, function (res) {
        var bufferHelper = new bufferhelper();
        res.on('data', function (chunk) {
            bufferHelper.concat(chunk);
        });

        res.on('end', function () {
            if (typeof callback === "function")
                callback(iconv.decode(bufferHelper.toBuffer(), 'GBK'));
        });
    }).on('error', function () {
        console.log('获取数据出错')
        httpGet(url, callback);
    });
}

function run() {
    let proCityCode = [];
    for (let name of provinceArr) {
        console.log(`开始读取${name}`);
        let code = chinese2Gb2312(name);
        httpGet(url + code, function (html) {
            proCityCode.push(filterCity(name, code, html));
            console.log(`${name}读取结束`);
            if (proCityCode.length === provinceArr.length) {
                fs.writeFile('proCityCode.json', JSON.stringify(proCityCode), 'utf8', function (err) {
                    if (err) {
                        return console.log(err.message);
                    }
                    else {
                        getNumberSegment(proCityCode);
                    }
                });
            }
        });
    }
}

exports.run = run;