// @flow

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import { IntlProvider, addLocaleData } from 'react-intl';
import de from 'react-intl/locale-data/de';
import en from 'react-intl/locale-data/en';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Assistant from './Assistant/Assistant';
import Landing from './Pages/Landing';
import About from './Pages/About';
import Theme from './Theme.js'
import './App.css'; 

import messagesDE from './I18n/de.json';
import messagesEN from './I18n/en.json';

const locale = "en";

addLocaleData([...de, ...en]);

const messages = {
  de: messagesDE,
  en: messagesEN
};

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="App-main">
            <Route exact path="/" component={Landing} />
            <Route exact path="/app/" component={Assistant} />
            <Route path="/app/:stage/" component={Assistant} />
            <Route path="/about/" component={About} />
          </div>
        </div>  
      </BrowserRouter>
    );
  }
}

const formats = {
  number: {
    currency: {
      style: 'currency',
      currency: 'EUR'
    },
    longCurrency: {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 6
    }
  }
};

const AppMaterialUI = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
    <App />
  </MuiThemeProvider>
);

const AppIntl = () => {
  return <IntlProvider 
    formats={formats}
    defaultFormats={formats}
    locale={locale}
    messages={messages[locale]}
    defaultLocale={"de"}
  >
    <AppMaterialUI />
  </IntlProvider>;
}

export default AppIntl;
