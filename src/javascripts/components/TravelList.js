import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TravelItem } from './TravelItem'
import { TravelContext } from './TravelRouter'

export function TravelList() {
    let { travels, setTravels } = useContext(TravelContext)

    const sortBy = (field) => {
        travels.sort((a, b) => a[field].localeCompare(b[field]))
        setTravels([...travels])
    }

    return (
        <>
            <div className="container">
                <div className="row mt-3">
                    <div className="col-8">Around The World</div>
                    <div className="col-2">
                        <Link to="/travels/new" className="btn btn-primary float-end">+ Destination</Link>
                    </div>
                    <div className="col-2">
                        <select className="form-select" onChange={ (e) => sortBy(e.target.value) }>
                            <option defaultValue="">Sort by:</option>
                            <option value="continent">Continent</option>
                            <option value="country">Country</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="container TravelList">
                { 
                    travels.map( t => {
                        return <TravelItem key={ t.id } travel={ t } />
                    })
                }
            </div>
        </>
    )
}