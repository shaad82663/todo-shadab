//Setting up config file.  -> on top coz of passport
const dotenv = require('dotenv')
dotenv.config({path : 'back-end/config/config.env'})



const app = require('./app')
const connectDB = require('./config/database')


//connecting db
connectDB()

const PORT = 3000 || process.env.PORT
const server = app.listen(PORT, () => {
    console.log(`Listening Over localhost:${PORT}`)
})