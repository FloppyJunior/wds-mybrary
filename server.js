const path = require('path');

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const homePageRouter = require(path.join(__dirname, 'controllers', 'index.js'));

/////////////////////////////////////////////////////////

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// By default 'layout.ejs' is used. 
// If you want to specify your custom layout (e.g. 'layouts/layout.ejs'), just set layout property in express app settings.
// voir : https://www.npmjs.com/package/express-ejs-layouts
app.set('layout', path.join('layouts', 'layout'));
app.use(expressLayouts);

app.use(express.static('public'));

/////////////////////////////////////////////////////////

app.use('/', homePageRouter);

app.listen(process.env.PORT || 3000);
