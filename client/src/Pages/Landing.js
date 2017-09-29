// @flow

import React from 'react';
import { NavLink } from 'react-router-dom'
import { defineMessages, FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  wrapper: {
    fontFamily: ["Open Sans", "sans-serif"]
  },
  title: {
    margin: "3em auto"
  },
  okay: {
    textDecoration: "none",
    color: "#212121",
    marginBottom: -10
  }
};

const messages = defineMessages({
  title: {
    id: "Landing.title",
    defaultMessage: "Klar sind 500 Euro für n WG-Zimmer viel, aber so hoch sind die Mieten jetzt halt in Berlin."
  },
  clicky: {
    id: "Landing.clicky",
    defaultMessage: "No way"
  }
});

const Landing = (props) => <div style={style.wrapper}>
  <h1 style={style.title} ><FormattedMessage {...messages.title} /></h1>
  <RaisedButton 
    secondary={true}
    label={<FormattedMessage {...messages.clicky} />}
    containerElement={<NavLink to="/preview/" />}
  />

</div>;

export default Landing;