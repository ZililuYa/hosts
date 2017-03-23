var express = require('express');
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');
var app = express();
var c = require('child_process');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//设置静态文件夹
app.use(express.static(path.join(__dirname, '')));
//设置模板文件夹
app.set('views', path.join(__dirname, ''));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

//DeBug
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(function (req, res, next) {
    next();
});


app.get('/home', function (req, res) {
    res.render('index');
});

var hosts = 'C:\\Windows\\System32\\drivers\\etc\\hosts';
if (!fsExistsSync(hosts)) {
    hosts = '\\etc\\hosts';
    if (!fsExistsSync(hosts)) {
        hosts = false;
    }
}

app.get('/hosts', function (req, res) {
    fs.readFile(hosts, 'utf-8', function (err, data) {
        if (err) {
            throw err;
        } else {
            res.send(data.toString());
        }
    });
});
app.post('/setHosts', function (req, res) {
    fs.writeFile(hosts, req.body.mainData, 'utf-8', function (err) {
        if (err) {
            res.send("500");
        } else {
            res.send("200");
        }
    });
});

if (hosts) {
    app.listen(2017, function () {
        c.exec('start http://localhost:2017');
    });
} else {
    console.error('hosts path error');
}

function fsExistsSync(path) {
    try {
        fs.accessSync(path, fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
}