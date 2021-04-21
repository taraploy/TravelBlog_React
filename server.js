let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')

// Connect to the database
import { connect } from './src/javascripts/config/db/connect'
connect("mongodb://localhost:27017/aroundtheworld")

// Create a web server
export let app = express()
// __dirname: top level of the application
app.set('views', path.join(__dirname, 'src', 'javascripts', 'views'))
// Set view engine to ejs
app.set('view engine', 'ejs')

// Add logger
// Loggin in development
app.use(logger('dev'))  // if production 'prod'
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Authentication
import passport from 'passport'
import { strategy } from './src/javascripts/config/passport'
passport.use(strategy)
app.use(passport.initialize())

// Routing
import { configureRoutes } from './src/javascripts/config/routes'
configureRoutes(app)

// Handling errors
app.use(function(req, res, next) {  // request, response, next
    res.render('layout', { content: 'error', err: createError(404), title: "Around The World"})
})
app.use(function(err, req, res, next) {     // error, request, response, next
    res.status(err.status || 500)
    res.render('layout', { content: 'error', err: err, title: "Around The World"})
})

// Create the web server
let http = require('http')
let server = http.createServer(app) // pass in express application as argument
server.listen(process.env.PORT || '8080')
// Process error
server.on('error', err => {
    throw err
})
// Indicate what to display, when the server start to listening to the incoming request and start processing them
server.on('listening', () => {
    let address = server.address()  // Get address from server
    let bind = typeof address === 'string' ? address : address.port // Check if address is a string otherwise display the port
    console.log("Listening on " + bind) // Display indication that server is listening
})

console.log("Hello from server")
