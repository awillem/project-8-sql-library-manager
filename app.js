const express = require('express');
const app = express();
const Book = require("./models").Book

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req,res) => {
    res.redirect('books');
});

app.get('/books', (req,res,next) => {
    Book.findAll(). then(() => {
        res.render('index', {title: "Books", Book});
    });
});

app.get('/books/new', (req,res) => {
    res.render('new-book', {title: "New Book"});
});

app.get('/books/:id', (req,res) => {
    // let id = req.params.id;
    res.render('update-book', {title: "Update Book"});
});

// app.post('/books/new', (req,res) => {
//     res.render('index', {title: "Home"});
// });

// app.post('/books/:id', (req,res) => {
//     res.render('index', {title: "Home"});
// });

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    res.render('page-not-found');
});


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});