const express = require('express');
const app = express();
const router = express.Router();
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

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

app.use('/', router);

app.listen(3200, 'localhost', () => console.log('Server On: localhost:3200'));
