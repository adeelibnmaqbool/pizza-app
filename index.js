require("dotenv").config()
const express = require("express")
const ejs = require("ejs")
const expressLayouts = require("express-ejs-layouts")
const { join } = require("path")
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("express-flash")
const MongoStore = require("connect-mongo")
const passport = require("passport")

const app = express();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI
const COOKIE_SECRET = process.env.COOKIE_SECRET

// Database Config
try {
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    var connection = mongoose.connection
    console.log("Database connected...")
} catch (error) {
    console.log("Connection failed...")
}

app.use(flash())

// MongoStore Configuration
const mongoStore = new MongoStore({
    mongoUrl: DB_URI,
    dbName: "pizza",
    collectionName: "sessions"
})

// Sessions Configuration
app.use(session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

// Password Config
const passportInit = (require("./app/config/passport"))
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


// Middlewares
app.use(express.static(join(__dirname, "/public")))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Global Middleware
app.use((req, res, next)=> {
    res.locals.session = req.session; next()
    res.locals.user = req.user
})

// EJS Operations
app.use(expressLayouts);
app.set("views", join(__dirname, "/resources/views"))
app.set("view engine", "ejs")

// Routes
require("./routes/web")(app)

// Server
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
