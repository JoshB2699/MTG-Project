const express = require('express');
const path = require('path');
const ejs = require('ejs');

const port = 8080;

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require('./config/routes.js')(app);

app.listen(port);
