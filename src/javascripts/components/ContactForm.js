import { useFormik } from 'formik'
import React from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import * as yup from 'yup'

toast.configure()   // Make toast work


export function VHelp({ message }) {
    return <p className="help">{ message }</p>
}

const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().required()
})

export default function ContactForm() {
    let {handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: ""
        },
        validationSchema,
        onSubmit(values) {
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)    // Pass the data
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

    const history = useHistory()

    return (
        <div className="container">
        {/* <div className="mb-4"> */}
            {/* <h2 className="font-weight-bold text-center my-4">Contact us</h2>
            <p className="text-center mx-auto mb-5">
                Do you have any questions? Please do not hesitate to contact us directly. 
                <br />
                Our team will come back to you as soon as we can.
            </p>           */}
            <div className="row ">
                <div className="col-md-9 mb-md-0 mb-5 contact-form">
                    <h2 className="font-weight-bold text-center my-4">Contact us</h2>
                    <p className="text-center mx-auto mb-5">
                        Do you have any questions? Please do not hesitate to contact us directly. 
                        <br />
                        Our team will come back to you as soon as we can.
                    </p> 
                    <form id="contact-form" name="contact-form" onSubmit={ handleSubmit }>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="md-form mb-0">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input className="form-control" type="text" name="name" value={ values.name } onChange={ handleChange } />
                                    <VHelp message={ errors.name } />
                                </div>
                            </div>
                    
                            <div className="col-md-6">
                                <div className="md-form mb-0">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input className="form-control" type="text" name="email" value={ values.email } onChange={ handleChange } />
                                    <VHelp message={ errors.email } />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="md-form mb-0">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea className="form-control" name="message" value={ values.message } onChange={ handleChange }></textarea>
                                    <VHelp message={ errors.message } />
                                </div>
                            </div>
                        </div>                        
                        <div className="text-center text-md-left">
                            <div className="mb-3 text-center">
                                {/* <div className=""> */}
                                    <button className="btn btn-secondary submitBtn me-2" type="submit">Submit</button>
                                    {/* <button className="btn btn-secondary cancelBtn" type="button" onClick={ () => history.push('/travels') }>Cancel</button> */}
                                {/* </div> */}
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-md-3 text-center contact-info">
                    <ul className="list-unstyled mb-0">
                        <li>
                            <FaMapMarkerAlt />
                            <p>Salt Lake City, UT 84150, USA</p>
                        </li>

                        <li>
                            <FaPhone />
                            <p>801 123 4567</p>
                        </li>

                        <li>
                            <FiMail />
                            <p>contact@aroundtheworld.com</p>
                        </li>
                    </ul>
                </div>
            </div>
        {/* </div> */}
        </div>
    )
}