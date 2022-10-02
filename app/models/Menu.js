const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: {type: String, required: true, trim: true},
    image: {type: String, required: true, trim: true},
    price: {type: String, required: true, trim: true},
    size: {type: String, required: true, trim: true}
})

const Menu = mongoose.model("menu", schema)

module.exports = Menu