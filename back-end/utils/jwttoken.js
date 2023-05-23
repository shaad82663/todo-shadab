//Create and send and save token in the cookie.
const User = require('../model/user')
const sendToken = async (user, ststusCode, res) => {
    //Create jwt token 
    const token = user.getJwtToken()
    const refreshToken = user.getJwtRefreshToken()
    await user.save()
    const options = {
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME*24*60*60*1000
        ),
        httpOnly : true
    }
    
    const refreshTokenOpptions = {
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME_REFRESH_TOKEN*24*60*60*1000 // 1 year
        ),
        httpOnly : true        
    }
    //Store the token in cookie.  {'token' : token} <=== {key : value}
    res.status(ststusCode)
        .cookie('token', token, options)
        .cookie('refresh_token', refreshToken, refreshTokenOpptions)
        .json({
        success : true,
        token,
        refreshToken
    })
}

module.exports = sendToken;