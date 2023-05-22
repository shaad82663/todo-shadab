const express = require('express')
const app = express()

const passport = require('passport')
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

//middleware for error handling
const errorMiddleware = require('./middlewares/errors')

app.use(express.json());
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({extended : true}));
app.use(passport.initialize())

//Route
const tasks = require('./routes/tasks')
const user = require('./routes/user')
app.use('/todo', tasks)
app.use('/auth', user)

//Using error handler middleware gllobally
app.use(errorMiddleware)

module.exports = app