const express = require('express')
const app = express()

app.use(express.json());


const tasks = require('./routes/tasks')
 
app.use('/', tasks)

module.exports = app