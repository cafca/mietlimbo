// @flow

import React from 'react';
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';

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
  },
  noway: {
    textDecoration: "none",
    color: "#B71C1C"
  }
};

const Landing = () => <div style={style.wrapper}>
  <h1 style={style.title} ><FormattedMessage
    id="Landing.title"
    defaultMessage="Klar sind 500 Euro für n WG-Zimmer viel, aber so hoch sind die Mieten jetzt halt in Berlin." /></h1>
  <p style={style.okay}><a style={style.okay} href="https://blog.mietlimbo.de/2016/12/01/was-ist-mietlimbo/">> Okay</a></p>
  <p style={style.noway}><Link to="/app/" style={style.noway}>> No way</Link></p>
</div>;

export default Landing;