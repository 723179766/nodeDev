const express = require('express');
const app = express();
const router = express.Router();
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// app.use(express.static('public'));

// 配置模板引擎
app.engine('html', exphbs({
    layoutsDir: 'views',
    defaultLayout: 'layout',
    extname: '.html'
}));
app.set('view engine', 'html');

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:63342");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

router.get('/', function (req, res, next) {
    res.render('index', {
        layout: false,
        title: "首页",
        personInfoList: [{
            name: "王炮儿(一拳超人)",
            age: 20
        }, {
            name: "炮姐(御坂美琴)",
            age: 15
        }]
    });
});

router.get('/file/:name', function (req, res, next) {
    const auth = false;
    if (auth === false) {
        return res.send('no power')
    }
});

router.get('/file1/:name', function (req, res, next) {
    console.log('file1file1file1');
    var options = {
        root: __dirname + '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    var fileName = req.params.name;
    const fname = fileName.split('.')[1];
    if (fname === 'pdf') {
        console.log('res set application/pdf');
        res.set({
            'Content-Type': 'application/pdf',
        });
    }
    if (fname === 'jpg') {
        console.log('res set image/jpeg');
        res.set({
            'Content-Type': 'image/jpeg',
        });
    }
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

router.post('/getFileUrl', function (req, res, next) {
    console.log(req.cookies.token)
    console.log('req.headersreq.headersreq.headers', req.headers)
    let domain = req.headers['referer'].match(/^(\w+:\/\/)?([^\/]+)/i);
    console.log(domain[0], 'domain1')
    domain = domain ? domain[2].split(':')[0].split('.').slice(-2).join('.') : null;
    console.log(domain, 'domain2')
    const src = '/file1/' + 'bigger.jpg';
    return res.json({
        src: src
    })
});

router.post('/blobFile', function (req, res, next) {
    let domain = req.headers['referer'].match(/^(\w+:\/\/)?([^\/]+)/i);
    console.log(domain[0], 'domain1')
    domain = domain ? domain[2].split(':')[0].split('.').slice(-2).join('.') : null;
    console.log(domain, 'domain2')
    var options = {
        root: __dirname + '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    var fileName = 'bigger.jpg';
    res.set({
        'Content-Type': 'application/octet-stream',
    });
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });

});

app.use('/', router);

app.listen(3200, () => console.log('Example app listening on port 3200!'));
