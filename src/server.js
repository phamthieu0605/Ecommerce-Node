require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const route = require('./routes/index.route')
const cookieParser = require('cookie-parser')
const db = require('./config/db')
const PORT = process.env.PORT || 3000;

app.use(cookieParser());

app.use(expressLayouts);
app.set('layout', './layouts/main')
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views/'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Route init
route(app)

// DB connect
db.connect()

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})
