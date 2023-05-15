const mongoose = require('mongoose')

const connectDB = ()=> {
    mongoose.connect(process.env.DB_LOCAL_URI, {  
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then(res => {
     console.log(`mongoDB Database is connected with ${process.env.DB_LOCAL_URI}`);
    })
}

module.exports = connectDB