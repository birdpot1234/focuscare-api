const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Register = require('./Register/routes');
//skdmskldmkda


////Body parser 
app.use(morgan('dev'));
app.use('/upload', express.static('upload'));
//app.use('/',express.static('regis_1'));
app.use(bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoding' }));
app.use(bodyParser.json({ limit: 1024 * 1024 * 2000, type: 'application/json' }));



app.use("/", Register);
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
