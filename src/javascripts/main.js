// Required by Webpack - do not touch
// require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

// TODO
import 'bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router } from 'react-router-dom'
import { TravelRouter } from './components/TravelRouter'
import ContactForm from './components/ContactForm'
import RegisterForm from './components/RegisterForm'
import LogOut from './components/LogOut'
import LogInForm from './components/LoginForm'

if (document.getElementById('main')) {
  ReactDOM.render(
    <Router>
      <TravelRouter />
    </Router>, document.getElementById('main')
  )
} else if (document.getElementById('contact')) {
  ReactDOM.render(
    <ContactForm/>, document.getElementById('contact')
  )
} else if (document.getElementById('register')) {
  ReactDOM.render(
    <RegisterForm/>, document.getElementById('register')
  )
} else if (document.getElementById('login')) {
  ReactDOM.render(
    <LogInForm />, document.getElementById('login')
  )
}

if (document.querySelector('#_log_user_out')) {
  document.querySelector('#_log_user_out').onclick = (e) => {
    let el = document.createElement('div')
    document.body.appendChild(el)
    ReactDOM.render(<LogOut />, el)
  }
}