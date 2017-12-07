import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Listing from '../components/Listing';
import Filters from '../components/Filters';

const items = [
  {
    title: "Apple iPhone X Street Photography — First Impressions",
    poster: "http://lorempixel.com/300/500/animals?sdd",
    videoSrc: "portrait.mp4"
  },
  {
    title: "Youtube on portrait mode!",
    poster: "http://lorempixel.com/300/500/animals?xcc",
    videoSrc: "portrait2.mp4"
  },
  {
    title: "Youtube on portrait mode!",
    poster: "http://lorempixel.com/300/500/animals?sdww",
    videoSrc: "portrait2.mp4"
  },
  {
    title: "Apple iPhone X Street Photography — First Impressions",
    poster: "http://lorempixel.com/300/500/animals",
    videoSrc: "portrait3.mp4"
  },
]

class Recent extends Component {
  render(){
    return (
        <div>
          <Filters />
          <Listing items={items} />          
        </div>
    )
  }
}

export default Recent