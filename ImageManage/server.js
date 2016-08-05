/**
 * Created by Administrator on 2016/7/21.
 */
var fs = require('fs');
let express = require('express');
let path = require('path');

let app = express();
let fileArr = [];

app.use(express.static('public'));
app.get('/', function (req, res) {
    renderHtml(req, res);
});

var readfile = function () {
    fileArr.length = 0;
    fs.readdir(path.join(__dirname, 'public/imgFile'), function (err, files) {
        if (err) {
            return console.log(err.message);
        }

        let page = [];
        for (let i = 0, count = files.length; i < count; i++) {
            if (i % 12 === 0 && page.length > 0) {
                fileArr.push(page);
                page = [];
            }
            page.push(files[i]);
        }
        if (page.length > 0)fileArr.push(page);
    });
}

app.get('/:page', function (req, res) {
    renderHtml(req, res);
});

app.post('/')

var server = app.listen(8888, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});

var renderHtml = function (req, res) {
    let { page = 1 } = req.params;
    if (page > fileArr.length)page = fileArr.length;

    let files = fileArr[page - 1];
    let html = '';
    let pageHtml = '';

    if (fileArr.length > 0) {
        html = '<div class="row-fluid">';
        for (let i = 0, count = files.length; i < count; i++) {
            if (i > 0 && i % 4 === 0) {
                html += `</div>
                     <div class="space10"></div>
                     <div class="row-fluid">`;
            }
            html += `
                    <div class="span3">
                        <div class="item">
                            <a class="fancybox-button" data-rel="fancybox-button" title="Photo" href="imgFile/${files[i]}">
                                <div class="zoom">
                                    <img src="imgFile/${files[i]}" alt="Photo"/>
                                    <div class="zoom-icon"></div>
                                </div>
                            </a>
                        </div>
                    </div>`;
        }
        html += `</div>
                   <div class="space10"></div>`;

        pageHtml = '';
        for (let i = 1; i <= fileArr.length; i++) {
            pageHtml += `<li><a href="/${i}">${i}</a></li>`;
        }
        if (page > 1)pageHtml = '<li><a href="/1">«</a></li>' + pageHtml;
        if (page < fileArr.length)pageHtml += `<li><a href="/${fileArr.length}">»</a></li>`;
    }

    fs.readFile(path.join(__dirname, 'index.html'), function (err, data) {
        if (err) {
            res.send(err.message);
        }
        else {
            res.send(data.toString().replace("${html}", html).replace("${pageHtml}", pageHtml));
        }
    });
}

setInterval(readfile, 5000);