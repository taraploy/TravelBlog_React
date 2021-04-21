import React from 'react'
import { useCookies } from 'react-cookie'

export default function LogOut() {
    const [ cookies, setCookie, removeCookie ] = useCookies(['token'])
    removeCookie('token')
    document.location = '/travels'
    return <></>
}
