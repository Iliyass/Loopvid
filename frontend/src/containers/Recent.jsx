import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Listing from '../components/Listing';
import Filters from '../components/Filters';
import { withStyles } from 'material-ui/styles';

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

const styles = theme => ({

});
class Recent extends Component {
  render(){
    const { classes } = this.props
    return (
        <div>
          <Listing items={items} />          
        </div>
    )
  }
}

export default withStyles(styles)(Recent)