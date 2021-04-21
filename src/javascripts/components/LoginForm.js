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
    username: yup.string().required(),
    password: yup.string().required()
})

export default function LogInForm() {
    let { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema,
        onSubmit(values) {
            fetch('/api/users/login', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                }, 
                credentials: 'same-origin',
                body: JSON.stringify(values),
            }) .then( (response) => {
                if (!response.ok) throw Error('Failed to log in')
                return response.text()
            }) .then( () => {
                toast('Successfully logged in', {
                    onClose: () => {
                        document.location = '/travels'
                    }
                })
            }) .catch( (err) => {
                toast('Failed to log in', {
                    onClose: () => {
                        document.location = '/travels'
                    }
                })
            })
        }
    })

    const history = useHistory()

    return (
        <div className="loginForm">
            <form onSubmit={ handleSubmit }>
                <h1>Login</h1>
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
                         <button className="btn btn-primary me-2" type="submit">Login</button>
                         <button className="btn btn-secondary" type="button" onClick={ () => ( document.location = '/travels')}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
