// @flow

import React, { Component } from 'react';
import autoBind from "react-autobind";
import { BrowserRouter, Route } from 'react-router-dom'

import { IntlProvider, addLocaleData } from 'react-intl';
import de from 'react-intl/locale-data/de';
import en from 'react-intl/locale-data/en';
import messagesEN from './I18n/en.json';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Assistant from './Assistant/Assistant';
import Landing from './Pages/Landing';
import About from './Pages/About';
import Theme from './Theme.js'
import './App.css'; 

const translations = {
  en: messagesEN
};

addLocaleData([...de, ...en]);


type AppProps = {
  locale: string,
  changeLocale: string => any
};

const App = (props: AppProps) => {
  return (
    <BrowserRouter>
      <div className="App">
        <DropDownMenu 
          style={{float: "right", marginRight: -10}} 
          underlineStyle={{display: "none"}}
          value={props.locale} 
          onChange={(e,k,locale) => props.changeLocale(locale)}>
          <MenuItem label="🇩🇪" primaryText="Deutsch" value="de" />
          <MenuItem label="🇬🇧" primaryText="English" value="en" />
        </DropDownMenu>
        <div className="App-main">
          <Route exact path="/" component={Landing} />
          <Route exact path="/app/" component={Assistant} />
          <Route path="/app/:stage/" component={Assistant} />
          <Route path="/about/" component={About} />
        </div>
      </div>  
    </BrowserRouter>
  );
};

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

const AppMaterialUI = (props: AppProps) => (
  <MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
    <App changeLocale={props.changeLocale} locale={props.locale} />
  </MuiThemeProvider>
);

class AppIntl extends Component {
  state : {
    locale: string
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      locale: "de"
    };
    autoBind(this);
  }

  render() {
    return <IntlProvider 
      formats={formats}
      defaultFormats={formats}
      locale={this.state.locale}
      messages={translations[this.state.locale]}
      defaultLocale={"de"}
    >
      <AppMaterialUI 
        changeLocale={locale => this.setState({locale})}
        locale={this.state.locale} />
    </IntlProvider>;
  }
}

export default AppIntl;
