const express = require('express')
const router = express.Router()

const passport = require('passport')
require('../config/passport')(passport)

// const {registerUser, test} = require('../controllers/userController')
const { registerUser, logInUser, logout, getUser, test, updateUser, changePassword} = require('../controllers/userController');

router.route('/test').get(passport.authenticate('jwt', {session : false}), test)
router.route("/register").post(registerUser);
router.route("/login").post(logInUser);
router.route("/logout").get(logout);
router.route('/user').get(passport.authenticate('jwt', {session : false})   , getUser)
router.route('/update/:id').put(passport.authenticate('jwt', {session : false})   , updateUser)
router.route('/password/change').put(passport.authenticate('jwt', {session : false})   , changePassword)
 
module.exports = router