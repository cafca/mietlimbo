// @flow

import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import de from 'react-intl/locale-data/de';
import { BrowserRouter, Route, NavLink } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './App.css'; 

import Assistant from './Assistant/Assistant';
import Landing from './Pages/Landing';
import About from './Pages/About';
import Theme from './Theme.js'

addLocaleData([...de]);

const Navigation = (props) => {
  const style = {
    main: {
      marginTop: 10,
      height: 25,
    },
    container: {
      float: "right"
    },
    link: {
      marginRight: 5,
      fontVariant: "small-caps",
      textDecoration: "none",
      color: "black"
    },
    active: {
      fontWeight: "bold"
    }
  };

  return <div className="App-Navigation" style={style.main} >
    <div style={style.container}>
      <NavLink style={style.link} activeStyle={style.active} exact={true} to="/">vorwort</NavLink>
      <NavLink style={style.link} activeStyle={style.active} to="/app/">mietlimbo</NavLink>
      <a style={style.link} href="https://blog.mietlimbo.de/">blog</a>
      <NavLink style={style.link} activeStyle={style.active} to="/about/">über</NavLink>
    </div>
  </div>;
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
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
