var express = require('express');
var router = require('router');
var bodyParser = require('body-parser');
var path = require('path');
const mongoose = require('mongoose');
const res = require('express/lib/response');
const routes = require('./server/routes/allRoute');
const sessions = require('express-session');
const multer = require('multer');



require('dotenv').config();


var app = express();

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));




app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

//Set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.use('/', routes);
app.use('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
  });















app.listen(8080);
console.log('Server is running');