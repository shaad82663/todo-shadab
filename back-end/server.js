/*Get todo
Add todo
Delete Todo
Update todo
Sort todos by creation time
Paging
Remove all todos
Batch create todos */
const app = require('./app')
const connectDB = require('./config/database')

const dotenv = require('dotenv')
dotenv.config({path : 'back-end/config/config.env'})

const PORT = 3000 || process.env.PORT

connectDB()
const server = app.listen(PORT, () => {
    console.log(`Listening Over localhost:${PORT}`)
})