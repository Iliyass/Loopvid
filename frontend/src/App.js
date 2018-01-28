import 'typeface-roboto';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import Mobile from './containers/Mobile';
import Recent from './containers/Recent';
import Categories from './containers/Categories';
import Trending from './containers/Trending';
import SingleCategory from './containers/SingleCategory';
import { Router, Route, Link } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import GraphQLClient from './apollo/client';
import { ApolloProvider } from 'react-apollo';

const history = createHistory()

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)


class App extends Component {
  render() {
    return (
      <ApolloProvider client={GraphQLClient}>
          <Router history={history}>
            <Mobile history={history}>
                <Route exact={true} path="/" component={Recent} />
                <Route exact={true} path="/trending" component={Trending} />
                <Route exact={true} path="/categories" component={Categories} />
                <Route exact={true} path="/categories/:category" component={SingleCategory} />
            </Mobile>
          </Router>
          </ApolloProvider>
    );
  }
}

export default App;
