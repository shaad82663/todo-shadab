const express = require('express')
const app = express()

//middleware for error handling
const errorMiddleware = require('./middlewares/errors')

app.use(express.json());

//Route
const tasks = require('./routes/tasks')
app.use('/todo', tasks)

//Using error handler middleware
app.use(errorMiddleware)

module.exports = app