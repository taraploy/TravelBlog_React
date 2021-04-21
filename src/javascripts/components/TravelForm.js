import React, { useContext } from 'react'
import { useFormik } from 'formik'
import { useHistory, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { TravelContext } from './TravelRouter'
import * as yup from 'yup'

toast.configure()   // Make toast work

function VHelp({ message }) {
    return <div className="invalid-feedback">{ message }</div>
}

const validationSchema = yup.object({
    country: yup.string().required(),
    continent: yup.string().required(),
    info: yup.string().required(),
    language: yup.string().required(),
    currency: yup.string().required(),
    food: yup.string().required(),
    accommodation: yup.string().required(),
    activities: yup.string().required(),
    transportation: yup.string().required(),
    safety: yup.string().required(),
    visa: yup.string().required(),
})

export function TravelForm() {
    let { travels, setTravels, authenticated, setAuthenticated } = useContext(TravelContext)
    const history = useHistory()
    let { tid } = useParams()
    let travel = tid ? travels.find( t => t.id == tid ) : {}

    // if (!authenticated) {
    //     document.location = '/login'
    //     return <></>
    // }

    let is_new = tid === undefined
    const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
        initialValues: is_new ? {
            country: "",
            continent: "",
            info: "",
            language: "",
            currency: "",
            food: "",
            accommidation: "",
            activities: "",
            transportation: "",
            safety: "",
            visa: ""
        } : { ...travel },
        validationSchema,
        onSubmit(values) {
            fetch(`/api/travels${ is_new ? '' : '/' + travels.id }`, {
                method: is_new ? 'POST' : 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: JSON.stringify(values)
            }) .then( () => {
                toast('Successfully submitted', {
                    onClose: () => {
                        document.location = '/travels'
                    }
                })
            }) .catch( (error) => {
                toast('Failed to submit', {
                    onClose: () => {
                        document.location = '/travels'
                    }
                })
            })
        }
    })
    
    return (
        <>
            <form className="needs-validation" onSubmit={ handleSubmit }>
                <h1>{ is_new ? 'Adding a new destination' : 'Editing a destination' }</h1>
                <div className="field mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <div className="input-group has-validation">
                        <input className={ `form-control ${ errors.country ? 'is-invalid' : '' }` } type="text" id="country" name="country" value={ values.country } onChange={ handleChange } />
                        <VHelp message={ errors.country } />
                    </div>
                </div>
                <div className="field mb-3">
                    <label htmlFor="continent" className="form-label">Continent</label>
                    <div className="input-group has-validation is-invalid">
                        <select className={ `form-control ${ errors.continent ? 'is-invalid' : '' }` } id="continent" name="continent" value={ values.continent } onChange={ handleChange }>
                            <option value="">Not selected</option>
                            <option value="Africa">Africa</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Asia">Asia</option>
                            <option value="Australia">Australia</option>
                            <option value="Europe">Europe</option>
                            <option value="North America">North America</option>
                            <option value="South America">South America</option>
                        </select>
                        <VHelp message={ errors.continent } />
                    </div>
                </div>
                <div className="field mb-3">
                    <label htmlFor="info" className="form-label">Information</label>
                    <div className="input-group has-validation">
                        <textarea className={ `form-control ${ errors.info ? 'is-invalid' : '' }` } id="info" name="info" value={ values.info } onChange={ handleChange }></textarea>
                        <VHelp message={ errors.info } />
                    </div>
                </div>
                <div className="field mb-3">
                    <label htmlFor="language" className="form-label">Language</label>
                    <div className="input-group has-validation">
                        <input className={ `form-control ${ errors.language ? 'is-invalid' : '' }` } type="text" id="language" name="language" value={ values.language } onChange={ handleChange } />
                        <VHelp message={ errors.language } />
                    </div>
                </div>
                <div className="field mb-3">
                    <label htmlFor="currency" className="form-label">Currency</label>
                    <div className="input-group has-validation">
                        <input className={ `form-control ${ errors.currency ? 'is-invalid' : '' }` } type="text" id="currency" name="currency" value={ values.currency } onChange={ handleChange } />
                        <VHelp message={ errors.currency } />
                    </div>
                </div>
                <div className="field mb-3">
                    <label htmlFor="food" className="form-label">Food</label>
                    <div className="input-group has-validation">
                        <textarea className={ `form-control ${ errors.food ? 'is-invalid' : '' }` } id="food" name="food" value={ values.food } onChange={ handleChange }></textarea>
                        <VHelp message={ errors.food } />
                    </div>
                </div>
                <div className="field mb-3">
                    <label htmlFor="accommodation" className="form-label">Accommodation</label>
                    <div className="input-group has-validation">
                        <textarea className={ `form-control ${ errors.accommodation ? 'is-invalid' : '' }` } id="accommodation" name="accommodation" value={ values.accommodation } onChange={ handleChange }></textarea>
                        <VHelp message={ errors.accommodation } />
                    </div>
                </div>
                <div className="field mb-3">
                    <label htmlFor="activities" className="form-label">Activities</label>
                    <div className="input-group has-validation">
                        <textarea className={ `form-control ${ errors.activities ? 'is-invalid' : '' }` } id="activities" name="activities" value={ values.activities } onChange={ handleChange }></textarea>
                        <VHelp message={ errors.activities } />
                    </div>
                </div>
                <div className="field mb-3">
                    <label htmlFor="transportation" className="form-label">Transportation</label>
                    <div className="input-group has-validation">
                        <textarea className={ `form-control ${ errors.transportation ? 'is-invalid' : '' }` } id="transportation" name="transportation" value={ values.transportation } onChange={ handleChange }></textarea>
                        <VHelp message={ errors.transportation } />
                    </div>
                </div>
                <div className="field mb-3">
                    <label htmlFor="safety" className="form-label">Safety</label>
                    <div className="input-group has-validation">
                        <textarea className={ `form-control ${ errors.safety ? 'is-invalid' : '' }` } id="safety" name="safety" value={ values.safety } onChange={ handleChange }></textarea>
                        <VHelp message={ errors.safety } />
                    </div>
                </div>
                <div className="field mb-3">
                    <label htmlFor="visa" className="form-label">Visa</label>
                    <div className="input-group has-validation">
                        <textarea className={ `form-control ${ errors.visa ? 'is-invalid' : '' }` } id="visa" name="visa" value={ values.visa } onChange={ handleChange }></textarea>
                        <VHelp message={ errors.visa } />
                    </div>
                </div>
                <div className="text-center text-md-left">
                    <div className="mb-3">
                        <div className="">
                            <button className="btn btn-primary me-2" type="submit">Submit</button>
                            <button className="btn btn-secondary" type="button" onClick={ () => is_new ? history.push(`/travels/`) : history.push(`/travels/${ values.id }`) }>Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}