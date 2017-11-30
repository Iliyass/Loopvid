import 'typeface-roboto';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import Mobile from './containers/Mobile';

const items = [
  {
    title: "Lorem Ipsum After HD should be here",
    poster: "http://lorempixel.com/300/500/people",
    videoSrc: "portrait.mp4"
  },
  {
    title: "Youtube on portrait mode!",
    poster: "http://lorempixel.com/300/500/animals",
    videoSrc: "portrait2.mp4"
  },
  {
    title: "Apple iPhone X Street Photography — First Impressions",
    poster: "http://lorempixel.com/300/500/nightlife",
    videoSrc: "portrait3.mp4"
  },
]
class App extends Component {
  render() {
    return (
        <Mobile>
          {
            items.map((i, id) => <Card key={id} {...i} />)
          }
        </Mobile>
    );
  }
}

export default App;
