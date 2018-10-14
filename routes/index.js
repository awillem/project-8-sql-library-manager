const express = require('express');
const router = express.Router();
const Book = require("../models").Book;

router.get('/', (req,res) => {
    res.redirect('books');
});

router.get('/books', (req,res,next) => {   
    Book.findAll().then(function(books){  
            res.render('index', {title: "Books", books: books});
        });
});

//Create new book form
router.get('/books/new', (req,res, next) => {
    res.render('new-book', {book: Book.build(), title: "New Book"});
});


router.get('/books/:id', (req,res) => {
    Book.findById(req.params.id).then(function(book){
        if(book) {
             res.render('update-book', {title: "Update Book", book: book});
        } else {
            res.send(404);
        }
    });
    
});

//POST new book
router.post('/books/new', function(req,res, next) {
    console.log('stuff');
    console.log(req.body);
    Book.create(req.body).then(function(){     
        res.redirect("/" );
    });
});

router.post('/books/:id', (req,res) => {
    res.render('index', {title: "Home"});
});

router.post('/books/:id/delete', (req,res) => {
    res.render('index', {title: "Home"});
});

module.exports = router