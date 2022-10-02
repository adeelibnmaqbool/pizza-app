const Menu = require("../../models/Menu")

const homeController = () =>{
    return {
        async index(req, res){
            try {
                let pizzas = await Menu.find()
                res.render("index", {pizzas})
            } catch (error) {
                console.log("Something went wrong.")
            }
        }
    }
}

module.exports = homeController