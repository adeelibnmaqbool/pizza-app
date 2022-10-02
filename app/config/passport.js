const User = require("../models/User")
const bcrypt = require("bcrypt")
const LocalStrategy = require("passport-local").Strategy

function init(passport) {
    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, async(email, password, done)=>{
        // Login
        // Check email exists
        const user = await User.findOne({email: email})
        if(!user){
            return done(null, false, {message: "No user with this email"})
        }
        bcrypt.compare(password, user.password)
            .then(match => {
                if(match){
                    return done(null, user, {message: "Logged in successfully"})
                }
                return done(null, false, {message: "Wrong username or password"})
            })
            .catch(err => {
                return done(null, false, {message: "OPPS! Something went wrong"})
            })

    }))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done)=>{
        User.findById(id, (err, user)=>{
            done(err, user)
       })
    })
}

module.exports = init