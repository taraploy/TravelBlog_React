import mongoose from 'mongoose'

const Schema = mongoose.Schema

let travelSchema = new Schema({
    country: String,
    continent: String,
    info: String,
    language: String,
    currency: String,
    food: String,
    accommodation: String,
    activities: String,
    transportation: String,
    safety: String,
    visa: String,
    created_by: { type: Schema.Types.ObjectId, ref: 'User' }    
})

travelSchema.virtual('id').get(function() {
    return this._id.toHexString()
})

travelSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret._id
    }
})

export let Travel = mongoose.model('Travel', travelSchema)
