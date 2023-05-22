const mongoose = require('mongoose');
const User = require('../model/user');
 
const bcrypt = require("bcryptjs");

//Error Handler for catching async errors separately.
const catchAsyncErrors = require('../middlewares/catchAsynErrors');

//To get token from the back-end for logged in and registering user
const sendToken = require("../utils/jwttoken"); 

const ErrorHandler = require('../utils/errorHandler');


//Register user   POST => /api/v1/user/register
exports.registerUser = catchAsyncErrors (async (req, res, next) => {
  const {name, email, password} = req.body;

  const user = await User.create(req.body); 
   sendToken(user ,200 ,res); 
})

//Login user   => /api/v1/user/login
exports.logInUser = catchAsyncErrors( async (req, res, next) => {
    const {email, password} = req.body;
 
    if(!email || !password) { 
        return next(new ErrorHandler("Please enter email and password", 400));
    }  

    const user = await User.findOne({email}).select('+password');
    
    if(!user) {
       return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    // console.log(isPasswordMatched)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password"), 401);
    }
    sendToken(user ,200 ,res); 
})

//Logout user => /api/v1/logout
exports.logout = catchAsyncErrors( async (req, res, next) => {
    res.cookie('token', null, {
        expires : new Date(Date.now()),
        httpOnly : true
    })

    res.status(200).json({
        success : true,
        message : "Logged out"
    })
})


//To get any  user for a list of uid     GET =>  /user/:id
// exports.getUser = catchAsyncErrors (async (req, res, next) => {
//     const id= req.params.id
//     const user = await User.findById(id)

//     if(!user) {
//         return next(new ErrorHandler(`No user found for id ${id}`), 404)
//     }

//     res.status(200).json({
//         success : true,
//         user
//     })
// })

//getUser -> self

exports.getUser = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success : true,
        user : req.user
    })
})

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.id; 
    const update = {};
  
    if (req.body.email) {
      update.email = req.body.email;
    }
  
    const updatedUser = await User.updateOne({ _id: userId }, update).exec();
  // Error will be handled by mongodb

    res.status(200).json({
      success: true,
      updatedUser,
    });
  });

  exports.changePassword = catchAsyncErrors(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;
  
    if (!currentPassword || !newPassword) {
      return next(new ErrorHandler("Current password and new password are required", 400));
    }
  
    try {
      const user = await User.findById(userId).select("+password");

      const isMatch = await user.comparePassword(currentPassword);
  
      if (!isMatch) {
        return next(new ErrorHandler("Invalid password", 401));
      }
      user.password = newPassword;
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      return next(new ErrorHandler("Error occurred while updating password", 500));
    }
  });


exports.test = catchAsyncErrors ( async (req, res, next) => {
    res.status(200).json({
        message : 'Protected route'
        })
})