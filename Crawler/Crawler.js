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
let cssImgRegex = /url(.*?)/g;

function getContent(callback) {
    if (typeof callback === "function") {
        http.get(url, function (res) {
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

/*
 * 提取文件
 * 参数：html(目标网页内容),regex(用于提取的正则表达式),dir(文件存放目录),callback(当前正则匹配完成后执行的下一步操作)
 * */
function extractFile(html, regex, dir, {sourceStr, replaceStr} = {}, getCallBack = null, callback = null) {
    //let regex = /<link.*?href="(\/html.*?)"/g;
    let group = regex.exec(html);
    if (!!group && !!group.length && group.length > 1) {
        let str = group[1];
        if (str.indexOf('/') === 0) {
            let lastIndex = str.lastIndexOf('/');
            var fileName = str.substring(lastIndex + 1);
            html = html.replace(str, `${dir}/${fileName}`);
            url = domain + str;
            getContent(function (html) {
                if (!!replaceStr && !!sourceStr)html = html.replace(new RegExp(sourceStr, 'gm'), replaceStr);
                let filePath = path.join(__dirname, dir, fileName);
                fs.writeFile(filePath, html, 'utf8', function (err) {
                    if (err)return console.log(err.message);
                    else console.log(`${filePath}写入成功！`);
                });
            });
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
    extractFile(html, cssRegex, 'css', {sourceStr: 'html/images/index2', replaceStr: 'image'}, null, extractJsFile);
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
    extractFile(html, imgRegex, 'image', {}, null, function (html) {
        fs.writeFile(path.join(__dirname, 'test.html'), html, 'utf8', function (err) {
            if (err)return console.log(err.message);
            else console.log(`test.html写入成功！`);
        });
    });
}

/*
 * 提取css中图片
 * */
function extractCssImgFile(html) {
    extractFile(html, cssImgRegex, 'image');
}


getContent(extractCssFile);