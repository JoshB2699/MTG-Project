const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('express-flash');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const config = require('./config/config.js');

const Card = require('./models/card.js');

const port = 8080;

require('./config/passport.js')(passport);

mongoose.connect(config.dbURL, {
  useMongoClient : true,
  user: 'mtgbot',
  pass: 'howdy'
});

var app = express();

//Set the view engine to use ejs.
app.set('view engine', 'ejs');
//Set up the views directory.
app.set('views', path.join(__dirname, 'views'));
//Set up public directory.
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));
//Set up morgan to aid in debugging.
app.use(morgan('dev'));
//Set up our various parsers
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Set the session secret.
app.use(session({ secret: 'ilovedankmaymays' }));
//Initialize passport.
app.use(passport.initialize());
//Enable persistent login sessions.
app.use(passport.session());
//Use express-flash for flash messages, stored in the session.
app.use(flash());



require('./config/routes.js')(app, passport, Card);

app.listen(port);

console.log("Website running on port " + port);
