// @flow

import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import de from 'react-intl/locale-data/de';

import logo from './logo.svg';
import './App.css';

import Assistant from './Assistant/Assistant';

addLocaleData([...de]);

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

const formats = {
  number: {currency: {
    style: 'currency',
    currency: 'EUR'
  }}
};

const AppIntl = () => {
  return <IntlProvider 
    formats={formats}
    defaultFormats={formats}
    locale={"de"}
    defaultLocale={"de"}
  >
    <App />
  </IntlProvider>;
}

export default AppIntl;
