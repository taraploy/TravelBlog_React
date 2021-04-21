import React from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'

toast.configure()   // Make toast work

export function VHelp({ message }) {
    return <p className="help">{ message }</p>
}

const validationSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    username: yup.string().required(),
    password: yup.string().required()
})

export default function RegisterForm() {
    let { handleSubmit, handleChange, values, errors, setFieldValie } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: ""
        },
        validationSchema,
        onSubmit(values) {
            fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',                                
                },
                credentials: 'same-origin',
                body: JSON.stringify(values)
            }) .then( (response) => {
                if (!response.ok) throw Error('Failed to register')
                return response.text()
            }) .then( () => {
                toast('Successfully registered', {
                    onClose: () => {
                        document.location = '/travels'
                    }
                })
            }) .catch( (err) => {
                toast('failed to register', {
                    onClose: () => {
                        document.location = '/travels'                        
                    }
                })
            })
        }
    })

    const history = useHistory()

    return (
        <div className="registerForm">
            <form onSubmit={ handleSubmit }>
                <h1>Register</h1>
                <div className="form-group">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input className="form-control" type="text" name="firstName" id="firstName" value={ values.firstName } onChange={ handleChange } />
                    <VHelp message={ errors.firstName } />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input className="form-control" type="text" name="lastName" id="lastName" value={ values.lastName } onChange={ handleChange } />
                    <VHelp message={ errors.lastName } />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input className="form-control" type="text" name="email" id="email" value={ values.email } onChange={ handleChange } />
                    <VHelp message={ errors.email } />
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input className="form-control" type="text" name="username" id="username" value={ values.username } onChange={ handleChange } />
                    <VHelp message={ errors.username } />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input className="form-control" type="password" name="password" id="password" value={ values.password } onChange={ handleChange } />
                    <VHelp message={ errors.password } />
                </div>
                {/* Buttons */}
                <div className="form-group">
                    <div className="control">
                        <button className="btn btn-primary me-2" type="submit">Register</button> 
                        <button className="btn btn-secondary" type="button" onClick={ () => ( document.location = '/travels')}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
