require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5001;

app.set('view engine', 'ejs');
mongoose.connect('mongodb+srv://'
    + process.env.MONGOO_ATLAS_DB_NAME + ':' + process.env.MONGOO_ATLAS_PW +
    '@cluster0.3u6wx.mongodb.net/spacall?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(
        console.log("Mongoose connected!")
    ).catch(err => {
        console.log("Mongoose connection failed!", err)
    })

app.use(morgan('dev'));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

const calllogRouters = require('./api/Routers/Calllog');

app.listen(PORT, function () {
    console.log('Ready!');
});

app.use('/calllog', calllogRouters);

app.get('/', function (req, res) {
    return res.status(200).json({
        message: 'Ok'
    })
})

app.get('/api/cookie', function (req, res) {
    res.status(200).json({ message: 'Cookie', cookie: req.cookies });
})