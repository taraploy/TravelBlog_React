import passport from 'passport'
import { User } from '../models/user'

export const registerUserAPI = (req, res, next) => {
    let user = new User()
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.email = req.body.email
    user.username = req.body.username
    user.setPassword(req.body.password)

    user.save( (err) => {
        if (err) {
            res.json({ success: false, message: 'Unable to register user'})
            res.end()
        } else {
            res.end()
        }
    })
}

export const logUserInAPI = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
          res.status(404).json(err)
          res.end()
        } else {
          if (user) {
            let token = user.generateJWT()
            res.cookie("token", token, { maxAge: 1000 * 60 /*60 * 24*/ })
            res.end()
          } else {
            res.status(401).json(err)
            res.end()
          }
        }
      })(req, res, next)
//       passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       res.status(404).json(err)
//       res.end()
//     } else {
//       if (user) {
//         let token = user.generateJWT()
//         res.cookie("token", token, { maxAge: 1000 * 60 * 60 /*60 * 24*/ })
//         res.end()
//       } else {
//         res.status(401).json(err)
//         res.end()
//       }
//     }
//   })(req, res, next)
}

