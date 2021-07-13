const express = require('express');
const app = express();
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appConfig = require('config');
const hbs = require("hbs");
const path = require('path')
let instance = require('./app/instance');

global.config = require('./app/config');

app.use("/",express.static(__dirname + "/public/css/"))

app.set('view engine', 'hbs')
app.set('views', './views')
app.set('trust proxy', true)

hbs.registerPartials( __dirname + "/views/partials" );

hbs.registerHelper('changeNum', function(num) { 
    num = 6 - num
    return num
});

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

hbs.registerHelper('setParent', function(num) {
    this.no = num
})


//connect to mongo
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true);
mongoose.connect(appConfig.mongo.host, (err) => {
    if (err)
        console.log("mongo connection error" + err)
    else
        console.log("Successfully connected to mongo database!")
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(expressValidator())

const routes = require('./app/routes')

app.use('/api', routes)

app.listen(appConfig.appPort, () => console.log(`listening on port ${appConfig.appPort}`))


module.exports = app;