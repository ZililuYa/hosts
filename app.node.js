var express = require('express');
var rou = express.Router();
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');
var app = express();

//设置静态文件夹
app.use(express.static(path.join(__dirname, '')));
//设置模板文件夹
app.set('views', path.join(__dirname, ''));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.get('/home', function (req, res) {
    console.log(1);
    res.render('index')
});

var host = 'C:\\Windows\\System32\\drivers\\etc\\hosts';
var hosts = "hosts";

rou.route('/hosts').get(function (req, res) {
    fs.readFile(hosts, 'utf-8', function (err, data) {
        if (err) {
            throw err;
        } else {
            res.send(data.toString());
        }
    });
}).post(function (req, res) {
    console.log(req.body, req.query, req.params);
    res.send(req.$body);
    // console.log(req, body.mainData);
    // fs.writeFile(hosts, 'utf-8', function (err) {
    //     if (err) {
    //         throw err;
    //     }
    // });
});

server = app.listen(2017, function () {
});
