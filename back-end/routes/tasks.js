const express = require('express')

const passport = require('passport')
require('../config/passport')(passport)

const { addTask, addAllTasks, getTask, getAllTasks, updateTask, deleteTask, deleteAllTasks, } = require('../controllers/tasksController')

const router = express.Router()

router.route('/add').post(passport.authenticate('jwt', {session : false}), addTask)
router.route('/add-all').post(passport.authenticate('jwt', {session : false}), addAllTasks)
router.route('/get/:id').get(passport.authenticate('jwt', {session : false}), getTask) 
router.route('/get-all/').get(passport.authenticate('jwt', {session : false}), getAllTasks)
router.route('/update/:id').put(passport.authenticate('jwt', {session : false}), updateTask)
router.route('/delete/:id').delete(passport.authenticate('jwt', {session : false}), deleteTask)
router.route('/delete-all/').delete(passport.authenticate('jwt', {session : false}), deleteAllTasks)

module.exports = router