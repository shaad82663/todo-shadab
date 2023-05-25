//Create and send and save token in the cookie.
const User = require('../model/user')
const sendToken = async (user, ststusCode, res) => {
    //Create jwt token 
    const token = user.getJwtToken()
    const refreshToken = user.getJwtRefreshToken()
    //Store the token in cookie.  {'token' : token} <=== {key : value}
    res.status(ststusCode).json({
        success : true,
        token,
        refreshToken
    })
}

module.exports = sendToken;