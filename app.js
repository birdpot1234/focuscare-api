const express = require('express');
const app = express();
const morgan = require('morgan');
const cookie = require('cookie-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const createApi = require('./src/index');
const constant = require('./src/constant')
// const Register = require('./src/authen/routes');
const connectDB = require('./connect_config');
// import { createApi } from './src';

require('moment/locale/th')
require('./connect'); // use knex

const corsOption = {
    optionsSuccessStatus: 200,
    preflightContinue: true,
    credentials: true
}

app.use(cors(corsOption));
app.use(cookie({
    name: constant.name,
    keys: [constant.key],
    maxAge: 8 * 60 * 60 * 1000,
    cookie: {
        httpOnly: true,
        secure: true
    }
}))

////Body parser 
app.use(morgan('dev'));
app.use('/upload', express.static('upload'));
app.use(bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoded' }));
app.use(bodyParser.json({ limit: 1024 * 1024 * 2000, type: 'application/json' }));

createApi(app)

app.get('/', (req, res) => {
    res.render('index');
})

//Error url send//
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app;
