if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

///////////////////////////////////////////////////////// UTILITIES

const path = require('path');

///////////////////////////////////////////////////////// EXPRESS

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

///////////////////////////////////////////////////////// MONGOOSE

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

// ! db = EventEmitter
const db = mongoose.connection;

db.once('open', function() {
    console.log(`Database connection established`);
});

db.on('error', function(error) {
    console.error(error);
})

///////////////////////////////////////////////////////// CONTROLLERS (ROUTERS)

const homePageRouter = require(path.join(__dirname, 'controllers', 'index.js'));

///////////////////////////////////////////////////////// BUILT-IN MIDDLEWARES

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// By default 'layout.ejs' is used. 
// If you want to specify your custom layout (e.g. 'layouts/layout.ejs'), just set layout property in express app settings.
// voir : https://www.npmjs.com/package/express-ejs-layouts
app.set('layout', path.join(__dirname, 'views', 'layouts', 'layout'));
app.use(expressLayouts);

app.use(express.static('public'));

///////////////////////////////////////////////////////// CUSTOM MIDDLEWARES

app.use('/', homePageRouter);

///////////////////////////////////////////////////////// START SERVER

app.listen(process.env.PORT || 3000);
