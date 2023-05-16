const express = require('express')

const {test, addTask, addAllTasks, getTask, getAllTasks, updateTask, deleteTask, deleteAllTasks, } = require('../controllers/tasksController')

const router = express.Router()

// router.route('/').get(test) 
router.route('/add').post(addTask)
router.route('/add-all').post(addAllTasks)
router.route('/get/:id').get(getTask) 
router.route('/get-all/').get(getAllTasks)
router.route('/update/:id').put(updateTask)
router.route('/delete/:id').delete(deleteTask)
router.route('/delete-all/').delete(deleteAllTasks)

module.exports = router