import React, { useState, createContext, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { TravelForm } from './TravelForm'
import { TravelList } from './TravelList'
import { Travel } from './Travel'
import { useCookies } from 'react-cookie'

export const TravelContext = createContext()

export function TravelRouter() {
    const [ travels, setTravels ] = useState()
    const [ cookies, setCookie, removeCookie ] = useCookies(['token'])
    let [ authenticated, setAuthenticated ] = useState(cookies.token !== undefined)

    useEffect( () => {
        if (!travels) {
            fetch('/api/travels', {
                credentials: 'same-origin'
            }) 
            .then( response => response.text() )
            .then( data => {
                console.log(data)
                setTravels(JSON.parse(data, (key, value) => {
                    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/
                    if (typeof value === 'string' && dateFormat.test(value)) {
                        return new Date(value)
                    }
                    return value
                }))
            })
            .catch( console.error )
        }
    })

    if (!travels) {
        return <p>Loading...</p>
    }

    return (
        <TravelContext.Provider value={{ travels, setTravels, authenticated, setAuthenticated}}>
            <Switch>
                <Route exact path="/travels"><TravelList /></Route>
                <Route path="/travels/new"><TravelForm /></Route>
                <Route path="/travels/:tid/edit"><TravelForm /></Route>
                <Route path="/travels/:tid"><Travel /></Route>
                <Redirect from="" to="/travels" />
            </Switch>
        </TravelContext.Provider>
    )
}
