/**
 * Created by Administrator on 2016-07-25.
 */
let http = require('http');
let fs = require('fs');
let path = require('path');

let domain = 'http://www.chengdu.gov.cn';
let url = 'http://www.chengdu.gov.cn/servicelist/jzz01/';
let cssRegex = /<link.*?href="(\/html.*?)"/g;
let jsRegex = /<script.*?src="(\/html.*?)"/g;
let imgRegex = /<img.*?src="(\/html.*?)"/g;
let cssImgRegex = /url\((.*?)\)/g;
let swfRegex = /<param.*?value="(.*?.swf)"/g;

function getContent(callback) {
    if (typeof callback === "function") {
        http.get(url, function (res) {
            res.setEncoding('utf8');
            var html = '';
            res.on('data', function (data) {
                html += data;
            });
            res.on('end', function () {
                callback(html);
            });
        }).on('error', function () {
            console.log('error');
        });
    }
}

function getImgeFile(fileName) {
    var writestream = fs.createWriteStream(path.join(__dirname, 'image', fileName));
    http.get(url, function (res) {
        res.pipe(writestream);
    });
    writestream.on('finish', function () {
    });
}

/*
 * 提取文件
 * 参数：html(目标网页内容),regex(用于提取的正则表达式),dir(文件存放目录),callback(当前正则匹配完成后执行的下一步操作)
 * */
function extractFile(html, regex, dir, {sourceStr, replaceStr} = {}, getCallBack = null, callback = null) {
    let group = regex.exec(html);
    if (!!group && !!group.length && group.length > 1) {
        let str = group[1];
        if (str.indexOf('/') === 0) {
            let lastIndex = str.lastIndexOf('/');
            var fileName = str.substring(lastIndex + 1);
            if (regex === swfRegex)
                html = html.replace(new RegExp(str, 'gm'), `${dir}/${fileName}`);
            else
                html = html.replace(str, `${dir}/${fileName}`);
            url = domain + str;
            if (regex === imgRegex || regex === cssImgRegex || regex === swfRegex) {
                getImgeFile(fileName);
            }
            else {
                getContent(function (fileContent) {
                    if (!!replaceStr && !!sourceStr) {
                        extractFile(fileContent, cssImgRegex, 'image', {});
                        for (let i = 0, count = sourceStr.length; i < count; i++)
                            fileContent = fileContent.replace(new RegExp(sourceStr[i], 'gm'), replaceStr);
                    }
                    let filePath = path.join(__dirname, dir, fileName);
                    fs.writeFile(filePath, fileContent, 'utf8', function (err) {
                        if (err)return console.log(err.message);
                    });
                });
            }
        }
        extractFile(html, regex, dir, {sourceStr, replaceStr}, getCallBack, callback);
    }
    else {
        if (typeof  callback === "function")
            callback(html);
    }
}

/*
 * 提取css文件
 * */
function extractCssFile(html) {
    extractFile(html, cssRegex, 'css', {
        sourceStr: ['/html/images/index2', '/html/images/customcolumn/template'],
        replaceStr: '../image'
    }, null, extractJsFile);
}

/*
 * 提取JS文件
 * */
function extractJsFile(html) {
    extractFile(html, jsRegex, 'js', {}, null, extractImageFile);
}

/*
 * 提取主页图片
 * */
function extractImageFile(html) {
    extractFile(html, imgRegex, 'image', {}, null, extractSwfFile);
}

/*
 * 提取swf
 * */
function extractSwfFile(html) {
    extractFile(html, swfRegex, 'image', {}, null, function (html) {
        fs.writeFile(path.join(__dirname, 'test.html'), html, 'utf8', function (err) {
            if (err)return console.log(err.message);
        });
    })
}


getContent(extractCssFile);