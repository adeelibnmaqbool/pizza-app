const User = require("../../models/User")
const bcrypt = require("bcrypt")
const passport = require("passport")
const authController = () => {
    return {
        login(req, res) {
            res.render("auth/login")
        },

        postLogin(req, res, next) {
            let {email, password } = req.body

            // Validate Request
            if (!email || !password) {
                req.flash("error", "All fields are required")
                req.flash("email", email)
                return res.redirect("/login")
            }
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash("error", info.message)
                    return next(err)
                }

                if (!user) {
                    req.flash("error", info.message)
                    return res.redirect("/login")
                }

                req.logIn(user, (err) => {
                    if (err) {
                        req.flash("error", info.message)
                        return next(err)
                    }
                    return res.redirect("/")
                })


            })(req, res, next)
        },

        register(req, res) {
            res.render("auth/register")
        },

        async postRegister(req, res) {
            let { name, email, password } = req.body

            // Validate Request
            if (!name || !email || !password) {
                req.flash("error", "All fields are required")
                req.flash("name", name)
                req.flash("email", email)
                return res.redirect("/register")
            }

            // Check email exists

            User.exists({ email }, (err, result) => {
                if (result) {
                    req.flash("error", "Email already exists")
                    req.flash("name", name)
                    req.flash("email", email)
                    return res.redirect("/register")
                }
            })

            // Create a user
            let salt = await bcrypt.genSalt(10)
            password = await bcrypt.hash(password, salt)
            const user = new User({ name, email, password })

            user.save().then(user => {
                //Login
                return res.redirect("/")
            }).catch(err => {
                req.flash("error", "OPPS! Something went wrong")
                req.flash("name", name)
                req.flash("email", email)
                return res.redirect("/register")
            })

        },
        
        logout(req, res, next){
            req.logout(err => {
                if(err){
                    // return next(err)
                    return res.redirect("/")
                }else{
                    return res.redirect("/login")
                }
            })
        }
    }
}

module.exports = authController