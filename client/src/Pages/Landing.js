// @flow

import React from 'react'
import { NavLink } from 'react-router-dom'
import { defineMessages, FormattedMessage } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'

import './Landing.css'

const style = {
  wrapper: {
    fontFamily: ['Open Sans', 'sans-serif']
  },
  title: {
    margin: '3em auto'
  }
}

const messages = defineMessages({
  title: {
    id: 'Landing.title',
    defaultMessage: 'Klar sind 500 Euro für n WG-Zimmer viel, aber so hoch sind die Mieten jetzt halt in Berlin.'
  },
  clicky: {
    id: 'Landing.clicky',
    defaultMessage: 'No way'
  }
})

const Landing = () => <div style={style.wrapper}>
  <h1 style={style.title} ><FormattedMessage {...messages.title} /></h1>
  <RaisedButton 
    className='clicky'
    secondary={true}
    label={<FormattedMessage {...messages.clicky} />}
    containerElement={<NavLink to="/preview/" />}
  />

</div>

export default Landing