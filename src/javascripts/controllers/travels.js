import { Travel } from '../models/travel'
import { getCurrentUser } from '../config/routes'
import { User } from '../models/user'

export const allTravelsAPI = (req, res, next) => {
    Travel.find().select().exec( (err, travels) => {
        if (err) {
            res.json({ success: false, message: 'Query failed' })
            res.end()
        } else {
            res.write(JSON.stringify(travels))
            res.end()
        }
    })
}

export const oneTravelAPI = (req, res, next) => {
    Travel.find().select().exec( (err, travel) => {
        if (err) {
            res.json({ success: false, message: 'Query failed'})
            res.end()
        } else {
            res.write(JSON.stringify(travel))
            res.end()
        }
    })
}

export const createTravelAPI = (req, res, next) => {
    let travel = new Travel(req.body)
    travel.added_at = new Date()
    travel.updated_at = new Date()
    travel.created_by = new User(getCurrentUser(req))
    travel.save( err => {
        if (err) {
            res.json({ success: false, message: 'Travel creation failed'})
            res.end()
        } else {
            res.end()
        }
    })
}

export const updateTravelAPI = (req, res, next) => {
    Travel.findOne({ _id: req.params.id }).select().exec( (err, travel) => {
        if (err) {
            res.json({ success: false, message: 'Unable to update' })
            res.end()
        } else {
            Object.assign(travel, req.body)
            travel.updated_at = new Date()
            travel.save( err => {
                if (err) {
                    res.json({ success: false, message: 'Unable to update travel'})
                    res.end()
                } else {
                    res.end()
                }
            })
        }
    })
}

export const deleteTravelAPI = (req, rest, next) => {
    Travel.findOne({ _id: req.params.id }).select().exec( (err, project) => {
        if (err) {
            res.json({ success: false, message: 'Unable to delete'})
            res.end()
        } else {
            Travel.findByIdAndDelete(req.params.id, err => {
                if (err) {
                    req.json({ success: false, message: 'Unable to delete project' })
                    res.end()
                } else {
                    res.end()
                }
            })
        }
    })
}

