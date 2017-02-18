"use strict"

const app = require('express')()
let express = require('express');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (request, response) => {
    response.render('pages/editor');
});

app.listen(8080);