const express = require('express');
const router = express.Router();
const Book = require("../models").Book;

router.get('/', (req,res) => {
    res.redirect('books');
});

router.get('/books', (req,res,next) => {   
    Book.findAll({attributes: ['title','author','genre','year']}).then(function(books){  
            console.log(books);    
            console.log('annoying');      
            res.render('index', {title: "Books", books: books});
        });
});

router.get('/books/new', (req,res) => {
    res.render('new-book', {title: "New Book"});
});

router.get('/books/:id', (req,res) => {
    // let id = req.params.id;
    res.render('update-book', {title: "Update Book"});
});

router.post('/books/new', (req,res) => {
    res.render('index', {title: "Home"});
});

router.post('/books/:id', (req,res) => {
    res.render('index', {title: "Home"});
});

module.exports = router