const express = require('express');
const app = express();
const router = express.Router();
const exphbs = require('express-handlebars');

// app.use(express.static('public'));

// 配置模板引擎
app.engine('html', exphbs({
    layoutsDir: 'views',
    defaultLayout: 'layout',
    extname: '.html'
}));
app.set('view engine', 'html');

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
    const auth = false
    if (auth === false) {
        return res.send('no power')
    }

    var options = {
        root: __dirname + '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    var fileName = req.params.name;
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });

});

router.get('/file1/:name', function (req, res, next) {
    const auth = true
    if (auth === false) {
        return res.send('no power')
    }

    var options = {
        root: __dirname + '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    var fileName = req.params.name;
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });

});

router.post('/blobFile', function (req, res, next) {
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