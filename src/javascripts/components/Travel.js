import React, { useContext, useState } from 'react'
import { format } from 'date-fns'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useHistory, useParams } from 'react-router-dom'
import { TravelContext } from './TravelRouter'
import { FiHome } from 'react-icons/fi'

toast.configure()   // Make toast work

// React modal
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  }

export function Travel() {
    let { travels, setTravels, authenticated, setAuthenticated } = useContext(TravelContext)
    let [ modalOpen, setModalOpen ] = useState(false)
    let { tid } = useParams()
    let t = tid ? travels.find( t => t.id == tid ) : {}
    const history = useHistory()
    // Delete destination
    const deleteTravel = () => {
        fetch(`/api/travels/${ t.id }`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },              
        }) .then( () => {
            toast('Successfully deleted', {
                onClose: () => {
                    document.location = '/travels'
                }
            })
        }) .catch( (error) => {
            toast('Failed to delete', {
                onClose: () => {
                    document.location = '/travels'
                }
            })
        })
    }

    return (
    <>
        <div className="container">
            <h2 className="country-title text-center">{ t.country } Travel Guide</h2>
            <hr className="hr-travel"/>
            <img className="text-center country-img" src={t.poster} alt={t.country}/>
            <br />
            <p>{ t.info }</p>

            <h4>Information</h4>
            <table className="country-table">
                <tr>
                    <td>Continent</td>
                    <td>{ t.continent }</td>
                </tr>
                <tr>
                    <td>Language</td>
                    <td>{ t.language }</td>
                </tr>
                <tr>
                    <td>Currency</td>
                    <td>{ t.currency }</td>
                </tr>
            </table>
            <h4>Activities</h4>
            <p>{ t.activities }</p>
            <h4>Accommodation</h4>
            <p>{ t.accommodation }</p>
            <h4>Food</h4>
            <p>{ t.food }</p>
            <h4>Transportation</h4>
            <p>{ t.transportation }</p>
            <h4>Safety</h4>
            <p>{ t.safety }</p>
            <h4>Visa</h4>
            <p>{ t.visa }</p>
            <div className="">
                { authenticated ? 
                <Link to={`/travels/${t.id}/edit`} className="btn btn-primary me-2 editBtn" 
                // onClick={ () => {
                //     if(authenticated) document.location = `/travels/${t.id}/edit`
                //     else document.location = '/signin'
                // }}
                >EDIT</Link>        : '' }  
                { authenticated ?       
                <button className="btn btn-danger me-2 deleteBtn"
                    onClick={ () => {
                    //     if (authenticated) 
                    setModalOpen(true)
                    //     else document.location = '/login'
                    }}
                >DELETE</button>    : '' } 
                <button className="btn btn-primary homeBtn" onClick={ () => history.push(`/travels/`)}>
                    <FiHome /> HOME
                </button>
                <Modal isOpen={ modalOpen } onRequestClose={() => setModalOpen(false)} style={ customStyles } contentLabel="Are you sure?">
                    <p>Are you sure you want to delete this project?</p>
                    <button className="btn btn-danger deleteBtn me-2" onClick={ deleteTravel }>
                        Confirm Delete
                    </button>
                    <button className="btn btn-secondary cancelBtn me-2" onClick={() => setModalOpen(false)}>
                        Cancel
                    </button>
                </Modal>       
                {/* Modal */}
                {/* <Modal isOpen={ modalOpen } onRequestClose={ () => setModalOpen(false)} style={ customStyles } contentLabel="Are you sure?">
                    <p>Are you sure you want to delete this article?</p>
                    <button className="btn btn-danger me-2" onClick={ deleteTravel }>Confirm Delete</button>
                    <button className="btn btn-secondary me-2" onClick={ () => setModalOpen(false) }>Cancel</button>
                </Modal>  */}
            </div>
        </div>     
    </>
    )
}