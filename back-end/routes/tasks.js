const express = require('express')

const {test, addTask, getTask, deleteTask, updateTask, getAllTasks, deleteAllTasks, addAllTasks} = require('../controllers/tasksController')

const router = express.Router()

router.route('/').get(test)
router.route('/task/add').post(addTask)
router.route('/task/add-all').post(addAllTasks)
router.route('/task/get/:id').get(getTask) 
router.route('/tasks/get/').get(getAllTasks)
router.route('/task/delete/:id').delete(deleteTask)
router.route('/tasks/delete/').delete(deleteAllTasks)
router.route('/task/update/:id').put(updateTask)

module.exports = router