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

//If book id exits, return update book page, otherwise, error page
router.get('/books/:id', (req,res) => {
    Book.findById(req.params.id).then(function(book){
        if(book) {
             res.render('update-book', {title: "Update Book", book: book});
        } else {
            res.render("./error");
        }
    });
    
});

//POST new book
router.post('/books/new', function(req,res, next) {
    Book.create(req.body).then(function(){     
        res.redirect("/" );
    }).catch(function(err){
        if(err.name === "SequelizeValidationError"){
            res.render('new-book', {
                book: Book.build(req.body),
                title: "New Book", 
                error: err.errors
            });
        } else {
            throw err;
        }
    });
});

//POST Posts updated book info
router.post('/books/:id', (req,res) => {
    Book.findById(req.params.id).then(function(book){
        if (book) {
            return book.update(req.body);
        } else {
            res.render("./error");
        } 
    }).then(function(book){
        res.redirect("/books");
    }).catch(function(err){
        if(err.name === "SequelizeValidationError"){
            let book = Book.build(req.body);
            book.id = req.params.id;
            res.render('update-book', {
                book: book,
                title: "Update Book", 
                error: err.errors
            });
        } else {
            throw err;
        }
    });
});

//POST delete book
router.post('/books/:id/delete', (req,res) => {
    Book.findById(req.params.id).then(function(book){
        if (book) {
            return book.destroy();
        } else {
            res.render("/books");
        }
    }).then(function() {
        res.redirect('/books');
    });
    
});

module.exports = router