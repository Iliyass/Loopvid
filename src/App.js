import 'typeface-roboto';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import Mobile from './containers/Mobile';

class App extends Component {
  render() {
    return (
        <Mobile>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        
        </Mobile>
    );
  }
}

export default App;
