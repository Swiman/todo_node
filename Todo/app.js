const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

var controller = require('./controllers/controller')
var app = express();

//setting the view engine 
app.set('view engine', 'ejs');

//static files used on every url
app.use(express.static('./public'));

controller(app);

//listen to port
app.listen(3000);