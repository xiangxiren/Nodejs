/**
 * Created by Administrator on 2016-08-05.
 */
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var requrl = 'http://www.easyicon.net/iconsearch/house/';

request(requrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //console.log(body);    //返回请求页面的HTML
        acquireData(body);
    }
})

function acquireData(data) {
    var $ = cheerio.load(data);

    $('.icon_img img').each(function () {
        let url = $(this).attr('src');
        let filename = path.basename(url);
        downloadImg(url, filename, function () {
            console.log(filename + ' done');
        });
    })
}

let downloadImg = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        // console.log('content-type:', res.headers['content-type']);  //这里返回图片的类型
        // console.log('content-length:', res.headers['content-length']);  //图片大小
        if (err) {
            console.log('err: ' + err);
            return false;
        }
        request(uri).pipe(fs.createWriteStream('public/imgFile/' + filename)).on('close', callback);  //调用request的管道来下载到 images文件夹下
    });
};
