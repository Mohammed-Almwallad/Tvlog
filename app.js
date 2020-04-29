const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');
const ejslayouts = require("express-ejs-layouts");
const flash = require('connect-flash');

const user = require('./routes/user.js');
const index = require('./routes/index.js');


const app = express();



const PORT = process.env.PORT || 3000;
console.log(process.env.PORT)
//connecting to db
mongoose.connect('mongodb://localhost/tvlog', { createIndexes: true, useUnifiedTopology: true, useNewUrlParser: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connnected to tvlog');
});

// passport for user authentication
app.use(require('express-session')({ secret: 'catty', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

// EJS
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(ejslayouts);


//bodyparser
app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());

app.use(flash());

//routes
app.use('/user', user);
app.use('/', index);

app.use('/public', express.static(path.join(__dirname, 'public')));



app.listen(PORT, (err) => {

  console.log(err);

});