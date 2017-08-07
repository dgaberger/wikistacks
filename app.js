var express = require('express');
var app = express();
var nunjucks = require('nunjucks');
var volleyball = require('volleyball');
var models = require('./models');
var router = require('./routes');
var bodyParser = require('body-parser')
var path = require('path');

// nunjucks setup
var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

// logging
app.use(volleyball);

// body parsing
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

// routing
app.use(router)

// sync db and listen
models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3000');
    });
})
.catch(console.error);

// style
app.use(express.static(path.join(__dirname, '/public')));