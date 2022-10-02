const homeController = require("../app/http/controllers/homeController")
const authController = require("../app/http/controllers/authController")
const cartController = require("../app/http/controllers/customer/cartController")
const { default: guest } = require("../app/http/middlewares/guest")

const initRoutes = app =>{
    app.get("/", homeController().index)

    app.get("/login", guest, authController().login)
    app.post("/login", guest, authController().postLogin)

    app.get("/register", guest, authController().register)
    app.post("/register", guest, authController().postRegister)
    
    app.post("/logout", authController().logout)

    app.get("/cart", cartController().index)
    app.post("/update-cart", cartController().update)

}


module.exports = initRoutes