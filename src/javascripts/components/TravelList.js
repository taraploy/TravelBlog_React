import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TravelItem } from './TravelItem'
import { TravelContext } from './TravelRouter'
import { FaPlus } from 'react-icons/fa'

export function TravelList() {
    let { travels, setTravels, authenticated, setAuthenticated } = useContext(TravelContext)

    const sortBy = (field) => {
        travels.sort((a, b) => a[field].localeCompare(b[field]))
        setTravels([...travels])
    }

    return (
        <>
            {/* <div className="container"> */}
                <div className="row mt-3">
                    {/* <div className="col-8"></div> */}
                    <div className="col-12 float-right">
                    {/* </div> */}
                    {/* <div className="col-2 float-right">                         */}
                    { authenticated ? <Link to="/travels/new" className="btn btn-primary destinationBtn float-right"><FaPlus/> DESTINATION</Link> : '' }
                        {/* <Link to="/travels/new" className="btn btn-primary destinationBtn float-right"><FaPlus/> Destination</Link> */}
                        <div className="sortBox">
                        <select className="form-select float-right" onChange={ (e) => sortBy(e.target.value) }>
                            <option defaultValue="">Sort by:</option>
                            <option value="continent">Continent</option>
                            <option value="country">Country</option>
                        </select>
                        </div>
                    </div>             
                </div>
            {/* </div> */}
            <div className="container TravelList"> 
                <div>
                    <h2 className="travel-tips text-center">TRAVEL TIPS</h2>
                    <hr className="hr-travel"/>
                    <p className="text-center">
                        If you already know where to go, select your destination below. 
                        You’ll find travel guides, the best things to do and accommodation guides to help you make the most of your trip.
                    </p>
                    <div className="row card-list">
                    { 
                        travels.map( t => {
                            return <TravelItem key={ t.id } travel={ t } />
                        })
                    }
                    </div>
                </div>
            </div>
        </>
    )
}