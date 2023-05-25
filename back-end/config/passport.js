const catchAsyncErrors = require('../middlewares/catchAsynErrors');

const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const User = require('../model/user')

const tokenExtractor = function (req) {
    return req.headers.authorization.split(' ')[1]
};
    
 
module.exports =  catchAsyncErrors((passport) => {
    passport.use(
        new jwtStrategy(
            {    
                secretOrKey: process.env.JWT_SECRET,
                jwtFromRequest: tokenExtractor
            },
            function (jwt_payload, done) {
                console.log('id '+jwt_payload.id)
                const user = User.findOne({_id : jwt_payload.id}, (err, user) => {
                    if (err) {
                        return done(err, false);
                    }
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
            }
        )
    )
})