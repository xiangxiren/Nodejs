/**
 * Created by Administrator on 2016-07-25.
 */
let http = require('http');
let fs = require('fs');
let path = require('path');

let domain = 'http://www.chengdu.gov.cn';
let url = 'http://www.chengdu.gov.cn/servicelist/jzz01/';
let jsonUrl = '/portals/information/findInformationById.json?id=74e82a40c4e7472aa0a106f93767163d';
let cssRegex = /<link.*?href="(\/html.*?)"/g;
let jsRegex = /<script.*?src="(\/html.*?)"/g;
let imgRegex = /<img.*?src="(\/html.*?)"/g;
let cssImgRegex = /url\((.*?)\)/g;
let swfRegex = /<param.*?value="(.*?.swf)"/g;

function getJsondata(callback, param) {
    http.get(domain + jsonUrl, function (res) {
        res.setEncoding('utf8');
        let content = '';
        res.on('data', function (data) {
            content += data;
        });
        res.on('end', function () {
            let dir = path.join(__dirname, 'json');
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir)
            }
            let xlsImg = '/com.wisesoft.bcp.web/static/js/ueditor-1.4.3.1/dialogs/attachment/fileTypeImages/icon_xls.gif';
            url = domain + xlsImg;
            content = content.replace(xlsImg, 'image/icon_xls.gif');
            getImgeFile('icon_xls.gif', 'image');
            fs.writeFile(path.join(__dirname, 'json', 'content.json'), content, function (err) {
                if (err)return console.log(err);
            });
        });
    });

    if (typeof callback === "function")
        callback(param);
}

function getContent(callback) {
    if (typeof callback === "function") {
        http.get(url, function (res) {
            res.setEncoding('utf8');
            var html = '';
            res.on('data', function (data) {
                html += data;
            });
            res.on('end', function () {
                html = html.replace("portals", "Nodejs/Crawler").replace("information/findInformationById", "json/content");
                callback(html);
            });
        }).on('error', function () {
            console.log('error');
        });
    }
}

function getImgeFile(fileName, dir) {
    if (!fs.existsSync(path.join(__dirname, dir))) {
        fs.mkdirSync(path.join(__dirname, dir))
    }
    var writestream = fs.createWriteStream(path.join(__dirname, dir, fileName));
    http.get(url, function (res) {
        res.pipe(writestream);
    });
    writestream.on('finish', function () {
        console.log(`${fileName}写入成功！`);
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
                getImgeFile(fileName, 'image');
            }
            else {
                getContent(function (fileContent) {
                    if (!!replaceStr && !!sourceStr) {
                        extractFile(fileContent, cssImgRegex, 'image', {});
                        for (let i = 0, count = sourceStr.length; i < count; i++)
                            fileContent = fileContent.replace(new RegExp(sourceStr[i], 'gm'), replaceStr);
                    }
                    let filePath = path.join(__dirname, dir, fileName);
                    if (!fs.existsSync(path.join(__dirname, dir))) {
                        fs.mkdirSync(path.join(__dirname, dir))
                    }
                    fs.writeFile(filePath, fileContent, 'utf8', function (err) {
                        if (err)return console.log(err.message);
                        else console.log(`${filePath}写入成功！`);
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
    extractFile(html, swfRegex, 'image', {}, null, writeHtmlFile);
}

function writeHtmlFile(html) {
    fs.writeFile(path.join(__dirname, 'test.html'), html, 'utf8', function (err) {
        if (err)return console.log(err.message);
        console.log('爬取完成')
    });
}

function Run() {
    getJsondata(getContent, extractCssFile);
}

exports.run = Run;