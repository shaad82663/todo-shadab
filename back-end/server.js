const app = require('./app')
const connectDB = require('./config/database')

//Setting up config file.
const dotenv = require('dotenv')
dotenv.config({path : 'back-end/config/config.env'})

//connecting db
connectDB()

const PORT = 3000 || process.env.PORT
const server = app.listen(PORT, () => {
    console.log(`Listening Over localhost:${PORT}`)
})