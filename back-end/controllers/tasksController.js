//error handling in controllers as well
const mongoose = require('mongoose')
const Task = require('../model/task')


exports.test = (req, res, next) => {
    res.status(200).json({
        message : 'testing route...'
    }) 
}
 
exports.addTask = async (req, res, next) => {
   const {name, description, progress, taskID} = req.body
   const task = await Task.create({name, description, progress, taskID})
   res.status(200).json({
      success : true,
      message : 'Task added in todo list successfully.',
      task
   })
}

exports.addAllTasks = async (req, res, next) => {
    const {tasks} = req.body
    const insertedTasks = await Task.insertMany(tasks)
    res.status(200).json({
       success : true,
       message : `${insertedTasks.length} tasks added in todo list successfully.`,
       insertedTasks
    })
 }

exports.getTask = async (req, res, next) => {
    const {id : taskID} = req.params
    const task = await Task.findOne({taskID})

    res.status(200).json({
        success : true,
        task
     })
}

exports.getAllTasks = async (req, res, next) => {//In ascending order of time. i.e. latest first.

    const pageNum = parseInt(req.query.page) || 1
    const perPage = 2

    const tasks = await Task.find({})
                             .sort({createdAt : -1})
                             .skip((pageNum-1)* perPage)
                             .limit(perPage)


    if(tasks.length === 0){
        console.log('no tasks found!')
    }
    res.status(200).json({
        success : true,
        count : tasks.length,
        tasks
    })
}

exports.updateTask = async (req, res, next) => {
    const {id : taskID} = req.params
    
    const task = await Task.findOneAndUpdate({taskID}, {$set : req.body}, {new : true})

    if(!task) {
        console.log('task not fouhnd')
    }
    res.status(200).json({
        success : true,
        message : 'Updated one task successfully.',
        task
     })
}

exports.deleteTask = async (req, res, next) => {
    const {id : taskID} = req.params
    
    const task = await Task.findOneAndDelete({taskID})

    if(!task) {
        console.log('task not fouhnd')
    }
    res.status(200).json({
        success : true,
        message : 'Deleted one task successfully.',
     })
}

exports.deleteAllTasks = async (req, res, next) => {
   await Task.deleteMany({})
   res.status(200).json({
    success : true,
    message : "Deleted all tasks successfully!"
   })
}