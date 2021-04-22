import express from 'express'
import jwt from 'jsonwebtoken'
import { aboutPage, contactPage, indexPage, loginPage, registerPage } from '../controllers/index'
import { allTravelsAPI, createTravelAPI, deleteTravelAPI, oneTravelAPI, updateTravelAPI } from '../controllers/travels'
import { contactAPI } from '../controllers/contacts'
import { registerUserAPI, logUserInAPI } from '../controllers/users'
import { APP_SECRET } from './vars'

let router = express.Router()

function isLoggedIn(req) {
    try {
        jwt.verify(req.cookies.token, APP_SECRET)
        return true
    } catch (err) {
        return false
    }
}

function requireLogIn(req, res, next) {
    if (isLoggedIn(req)) {
        next()
    } else {
        res.status(401)
        res.end()
    }
}

export function getCurrentUser(req) {
    if (req.cookies.token) {
        return jwt.decode(req.cookies.token, APP_SECRET)    
    } else {
        return null
    }
}

export function configureRoutes(app) {
    app.all('*', (req, res, next) => {
        app.locals.loggedIn = isLoggedIn(req)
        app.locals.currentUser = getCurrentUser(req)
        next()
    })

    router.get('/', indexPage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)

    router.get('/login', loginPage)
    router.get('/register', registerPage)

    router.get('/travels*', indexPage)  // Wildcard (refresh page)
    router.get('/register', indexPage)
    router.get('/login', indexPage)

    // Travels API Endpoints
    router.get('/api/travels', allTravelsAPI)
    router.get('/api/travels/:id', oneTravelAPI)
    router.post('/api/travels', requireLogIn, createTravelAPI)
    router.put('/api/travels/:id', requireLogIn, updateTravelAPI)
    router.delete('/api/travels/:id', requireLogIn, deleteTravelAPI)

    // Users
    router.post('/api/users/register', registerUserAPI)
    router.post('/api/users/login', logUserInAPI)
    router.post('/api/contact', contactAPI)

    // All routes start with '/'
    app.use('/', router)
}