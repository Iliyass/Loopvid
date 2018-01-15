import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Listing from '../components/Listing';
import Filters from '../components/Filters';
import { withStyles } from 'material-ui/styles';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const queryVideos = gql`
  query allVideos{
    videos(sort: { UploadDate: true }){
      id
      title
      src
      thumbnail
      upvotes
      downvotes
      published_at
      user {
        id
        fullName
        avatar
      }
    }
  }
`

const itemss = [
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
    const { classes, data } = this.props
    if(data.loading) return "Loading...";
    if(data.error) return "Sorry, Uknown error happend...";
    return (
        <div>
          <Listing items={data.videos} />          
        </div>
    )
  }
}
export default graphql(queryVideos)(withStyles(styles)(Recent))