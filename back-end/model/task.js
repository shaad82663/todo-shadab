const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
   name: {
    type: String,
    maxLength: 20,
    required: [true, 'name is required!']
   },
   description: {
    type: String,
    maxLength: 100,
    required: [true, 'description is required!']
   },
   progress: {
    type: String,
    enum: {
        values : ['completed', 'in progress', 'not started'],
        messsage : 'Invlid Progess value-> enum -> \'completed\', \'in progress\', \'not started\' '
    },  
    required:[true, 'progress is required!']
   },
   taskID : {
    type : String,
    required : [true, 'task id is required!'], 
    unique : [true, 'Task ID must be unique!'],
    validate: {
        validator: function (value) {
          return /^[a-zA-Z]\d{3}$/.test(value);
        },
        message: 'Task ID must be in the format:<alph><digit><digit><digit>'
      }
   },
   createdAt : {
    type : Date,
    default : Date.now
   }  
});

module.exports = mongoose.model('Task', taskSchema);
