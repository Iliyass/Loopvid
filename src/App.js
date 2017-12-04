import 'typeface-roboto';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import Mobile from './containers/Mobile';
import Recent from './containers/Recent';
import { Router, Route, Link } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

class App extends Component {
  render() {
    return (
          <Router history={history}>
            <Mobile history={history}>
                <Route exact={true} path="/" component={Recent} />
            </Mobile>
          </Router>
    );
  }
}

export default App;
