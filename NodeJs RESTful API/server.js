/**
 * Created by Administrator on 2016-07-18.
 */
var express = require('express');
var fs = require('fs');
var app = express();

//添加的新用户数据
var user = {
    "user4": {
        "name": "mohit",
        "password": "password4",
        "profession": "teacher",
        "id": 4
    }
};

app.get('/listUsers', function (req, res) {
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    })
});

app.get('/addUser', function (req, res) {
    //读取已存在的数据
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
        if (err) {
            res.end(err.message);
            return;
        }
        data = JSON.parse(data);
        data['user4'] = user['user4'];

        fs.writeFile(__dirname + '/' + 'users.json', JSON.stringify(data), function (err) {
            if (err) {
                res.end(err.message);
                return;
            }
            fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
                if (err) {
                    res.end(err.message);
                    return;
                }
                console.log(data);
                res.end(JSON.stringify(data));
            })
        });
    });
});

app.get('/:id', function (req, res) {
    //读取已存在的用户
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
        if (err) {
            res.end(err.message);
            return;
        }
        data = JSON.parse(data);
        var user = data['user' + req.params.id];
        console.log(user);
        res.end(JSON.stringify(user));
    });
});

app.get('/deleteUser/:id', function (req, res) {
    //读取用户
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
        if (err) {
            return res.end(err.message);
        }
        data = JSON.parse(data);
        delete data['user' + req.params.id];
        fs.writeFile(__dirname + '/' + 'users.json', JSON.stringify(data), function (err) {
            if (err) {
                return res.end(err.message);
            }
            fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
                if (err) {
                    return res.end(err.message);
                }
                console.log(data);
                res.end(JSON.stringify(data));
            })
        })
    })

});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});