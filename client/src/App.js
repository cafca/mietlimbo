// @flow

import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';

import logo from './logo.svg';
import './App.css';

import Assistant from './Assistant/Assistant';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Willkommen bei mietlimbo</h2>
        </div>
        <div className="App-intro">
          <Assistant />
        </div>
      </div>
    );
  }
}

const AppIntl = () => {
  return <IntlProvider 
    locale={"en"}
  >
    <App />
  </IntlProvider>;
}

export default AppIntl;
