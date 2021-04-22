const LocalStrategy = require("passport-local").Strategy
import { User } from "../models/user"
export const strategy = new LocalStrategy(function (username, password, done) {
  console.log("before findOne")
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log(err)
      return done(err)
    } else {
      if (!user) {
        console.log("1")
        return done(null, false, { message: "User not found" })
      } else {
        if (!user.isValidPassword(password)) {
          console.log("2")
          return done(null, false, { message: "Incorrect password" })
        } else {
          console.log("3")
          return done(null, user)
        }
      }
    }
  })
})
