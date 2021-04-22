import React from 'react'
import { Link } from 'react-router-dom'


export function TravelItem(props) {
    const t = props.travel

    return (
        <>        
        <div className="card text-center mx-auto">
            <Link to={`/travels/${ t.id }`} className="card-link">
                {/* <div className="card-size"> */}
                    {/* <div className="card-body"> */}
                    <h4>{t.country}</h4>
                    {/* </div> */}
                    <img className="card-img-bottom" src={t.poster} alt={t.country}/>
                    
                {/* </div> */}
                {/* <div>
                    <Link to={`/travels/${ t.id }`} className="btn btn-primary">More...</Link>
                </div> */}
            </Link>
        </div>
        </>
    )
}
