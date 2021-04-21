import React from 'react'
import { Link } from 'react-router-dom'


export function TravelItem(props) {
    const t = props.travel

    return (
        <div>
            <h1>{t.country}</h1>
            <div>
                <Link to={`/travels/${ t.id }`} className="btn btn-primary">More...</Link>
            </div>
        </div>
    )
}