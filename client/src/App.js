// @flow

import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import de from 'react-intl/locale-data/de';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter, Route } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './App.css';

import Assistant from './Assistant/Assistant';
import Landing from './Landing';
import Theme from './Theme.js'

addLocaleData([...de]);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="App-main">
            <Route exact path="/" component={Landing} />
            <Route path="/app/:stage/" component={Assistant} />
            <Route path="/app/" component={Assistant} />
          </div>
        </div>  
      </BrowserRouter>
    );
  }
}

const formats = {
  number: {currency: {
    style: 'currency',
    currency: 'EUR'
  }}
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
    locale={"de"}
    defaultLocale={"de"}
  >
    <AppMaterialUI />
  </IntlProvider>;
}

export default AppIntl;
