import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Listing from '../components/Listing';

const items = [
  {
    title: "Lorem Ipsum After HD should be here",
    poster: "http://lorempixel.com/300/500/animals",
    videoSrc: "bunny.mp4"
  },
  {
    title: "Youtube on portrait mode!",
    poster: "http://lorempixel.com/300/500/animals",
    videoSrc: "portrait4.mp4"
  },
  {
    title: "Apple iPhone X Street Photography — First Impressions",
    poster: "http://lorempixel.com/300/500/animals",
    videoSrc: "portrait.mp4"
  },
  {
    title: "Youtube on portrait mode!",
    poster: "http://lorempixel.com/300/500/animals",
    videoSrc: "portrait2.mp4"
  },
  {
    title: "Apple iPhone X Street Photography — First Impressions",
    poster: "http://lorempixel.com/300/500/animals",
    videoSrc: "portrait3.mp4"
  },
  {
    title: "Youtube on portrait mode!",
    poster: "http://lorempixel.com/300/500/animals",
    videoSrc: "portrait2.mp4"
  },
  {
    title: "Apple iPhone X Street Photography — First Impressions",
    poster: "http://lorempixel.com/300/500/animals",
    videoSrc: "portrait3.mp4"
  },
  {
    title: "Youtube on portrait mode!",
    poster: "http://lorempixel.com/300/500/animals",
    videoSrc: "portrait2.mp4"
  },
  {
    title: "Apple iPhone X Street Photography — First Impressions",
    poster: "http://lorempixel.com/300/500/animals",
    videoSrc: "portrait3.mp4"
  },
  {
    title: "Youtube on portrait mode!",
    poster: "http://lorempixel.com/300/500/animals",
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
    console.log("shit", items)
    return (
        <Listing items={items} />
    )
  }
}

export default Recent