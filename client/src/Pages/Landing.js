// @flow

import React from 'react';
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';

const style = {
  title: {
    margin: "3em auto"
  },
  link: {
    textDecoration: "none",
    color: "black"
  }
};

const Landing = () => <div>
  <h1 style={style.title} ><FormattedMessage
    id="Landing.title"
    defaultMessage="Klar sind 500 Euro für n WG-Zimmer viel, aber so hoch sind die Mieten jetzt halt in Berlin." /></h1>
  <p><a href="https://blog.mietlimbo.de/2016/12/01/was-ist-mietlimbo/" style={style.link}>> Okay</a></p>
  <p><Link to="/app/" style={style.link}>> No way</Link></p>
</div>;

export default Landing;