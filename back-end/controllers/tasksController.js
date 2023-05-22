//auth, autho
//get, update
//access token, refresh token -> passport.js, jwt
//change password, update pasword, encrypt password 

//error handling in controllers as well
const mongoose = require('mongoose')
const Task = require('../model/task')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynErrors = require('../middlewares/catchAsynErrors')


// Add todo
exports.addTask = catchAsynErrors(async (req, res, next) => {
   const {name, description, progress, taskID} = req.body
   const user =  req.user
   const task = await Task.create({name, description, progress, taskID, user})

   res.status(200).json({
      success : true,
      message : 'Task added in todo list successfully.',
      task
   })
})

//Batch create todos
exports.addAllTasks = catchAsynErrors(async (req, res, next) => {
    const {tasks} = req.body
    const insertedTasks = await Task.insertMany(tasks)
    res.status(200).json({
       success : true,
       message : `${insertedTasks.length} tasks added in todo list successfully.`,
       insertedTasks
    })
})

//Get todo
exports.getTask = catchAsynErrors( async (req, res, next) => {
    const {id : taskID} = req.params
    const task = await Task.findOne({taskID})
    if(req.user._id.toString() !== task.user.toString()){
       return next(new ErrorHandler('No right to given task id.', 404))
    }
   if(!task) {
    return next(new ErrorHandler(`Could not find task with id:${taskID}`, 404))
   }
    res.status(200).json({
        success : true,
        task
     })
})

//Sort todos by creation time (In ascending order of time. i.e. latest first).
//Paging
//count, hasNext.
exports.getAllTasks = async (req, res, next) => {
    const pageNum = parseInt(req.query.page) || 1
    const perPage = 4
    const tasks = await Task.find({})
                             .sort({createdAt : -1})
                             .skip((pageNum-1)* perPage)
                             .limit(perPage)
    const resTasks = []
    for(task of tasks){
        if(req.user._id.toString() === task.user.toString()){
            resTasks.push(task)
         }
    }

    if(tasks.length === 0){
    return next(new ErrorHandler(`Could not find any task.`, 404))
    }
    res.status(200).json({
        success : true,
        count : tasks.length,
        resTasks
    })
}

//Update todo
exports.updateTask = catchAsynErrors((async (req, res, next) => {
    const {id : taskID} = req.params
    const task = await Task.findOneAndUpdate({taskID}, {$set : req.body}, {new : true})
    if(!task) { 
        return next(new ErrorHandler('Could not update the task', 404))
    }
    if(req.user._id.toString() !== task.user.toString()){
        return next(new ErrorHandler('No right to given task id.', 404))
     }
    res.status(200).json({
        success : true,
        message : 'Updated one task successfully.',
        updatedTask : task
     })
}))

//Delete Todo
exports.deleteTask = async (req, res, next) => {
    const {id : taskID} = req.params
    
    const task = await Task.findOneAndDelete({taskID})
    if(!task) {
        return next(new ErrorHandler(`Could not find the task with id:${taskID}`, 404))
    }
    if(req.user._id.toString() !== task.user.toString()){
        return next(new ErrorHandler('No right to given task id.', 404))
     }
    res.status(200).json({
        success : true,
        message : 'Deleted one task successfully.',
     })
}

//Remove all todos
exports.deleteAllTasks = async (req, res, next) => {
   await Task.deleteMany({})
   res.status(200).json({
    success : true,
    message : "Deleted all tasks successfully!"
   })
}