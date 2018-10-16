const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/index');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.use('/static', express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', routes);




app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);    
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    if(err.status === 404) {        
       return res.render('page-not-found')
    } else {
        res.render('error');
    }
});



module.exports = app;