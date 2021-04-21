import React, { useContext, useState } from 'react'
import { format } from 'date-fns'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory, useParams } from 'react-router-dom'
import { TravelContext } from './TravelRouter'

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
              methhod: 'DELETE',
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
            <h1>Travel.js with delete function { t.country }</h1>
        </>
      )
  }