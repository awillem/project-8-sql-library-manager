const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/index');



app.use('/static', express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', routes);



// app.get('/', (req,res) => {
//     res.redirect('books');
// });

// app.get('/books', (req,res,next) => {   
//         res.render('index', {title: "Books"});
// });

// app.get('/books/new', (req,res) => {
//     res.render('new-book', {title: "New Book"});
// });

// app.get('/books/:id', (req,res) => {
//     // let id = req.params.id;
//     res.render('update-book', {title: "Update Book"});
// });

// app.post('/books/new', (req,res) => {
//     res.render('index', {title: "Home"});
// });

// app.post('/books/:id', (req,res) => {
//     res.render('index', {title: "Home"});
// });

// app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);    
// });

// app.use((err, req, res, next) => {
//     res.locals.error = err;
//     res.status(err.status);
//     if(err.status === 404) {        
//        return res.render('page-not-found')
//     } else {
//         res.render('error');
//     }
// });


// app.listen(3000, () => {
//     console.log('The application is running on localhost:3000!');
// });

module.exports = app;