//TODO
import mongoose from 'mongoose'

// Create a function for connecting to the database (mongodb database, exportable)
export function connect(uri) {
    if (process.env.NODE_ENV === "production") {
        uri = process.env.MONGODB_URI
    }

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })

    // connection successful
    mongoose.connection.on('connected', () => {
        console.log(`Connected to ${uri}.`)
    })

    // connection error
    mongoose.connection.on('error', (err) => {
        console.log(`Connection error to ${err}.`)
    })

    // connection disconnected
    mongoose.connection.on('disconnected', () => {
        console.log(`Disconnected from  ${uri}.`)
    })
}