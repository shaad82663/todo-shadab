const catchAsyncErrors = require('../middlewares/catchAsynErrors');

const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const User = require('../model/user')

const cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.token;
    }
    return token;
};
  
 
module.exports =  catchAsyncErrors((passport) => {
    passport.use(
        new jwtStrategy(
            {    
                secretOrKey: process.env.JWT_SECRET,
                jwtFromRequest: cookieExtractor
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