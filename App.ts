import express =require('express');
import bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var exphbs  = require('express-handlebars');
var session = require('express-session');
var hbs_sections = require("express-handlebars-sections");
import path from 'path'

import router from './src/routes/index'

const app = express();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/src/views'));

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/src/views/layouts'),
    partialsDir: path.join(__dirname, '/src/views'),
    helpers:{
        section: hbs_sections()
    }
}));

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/src/public')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json()); //database

// use session
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        name: "data"
    }
}));

app.use('/',router);
export default app;